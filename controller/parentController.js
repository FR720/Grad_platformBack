const User = require("../models/parentdb");
const Student = require("../models/studentdb");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./ParentProfilePic/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}_${new Date().getTime()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});

const SignUp = function (req, res, next) {
  User.findOne({ parentMail: req.body.mail })
    .select("parentName parentMail _id parentPhoneNumber parentAge")
    .then((result) => {
      if (!result) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              message: err,
            });
          } else {
            const user = new User({
              parentAge: req.body.age,
              parentMail: req.body.mail,
              parentName: req.body.name,
              parentPassword: hash,
              parentPhoneNumber: req.body.phone,
              profilePictureUrl: "Profile/default.png",
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  parent: {
                    status: "account successfully created",
                    _id: result._id,
                    parentName: result.parentName,
                    parentMail: result.parentMail,
                    parentPhoneNumber: result.parentPhoneNumber,
                    parentAge: result.parentAge,
                  },
                });
              })
              .catch((err) => {
                res.status(404).json({
                  message: err,
                });
              });
          }
        });
      } else {
        res.status(409).json({
          parent: {
            status: "this mail is already registered",
          },
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

const SignIn = function (req, res, next) {
  User.findOne({ parentMail: req.body.mail })
    .select(
      "parentName parentPassword parentMail profilePictureUrl _id parentPhoneNumber parentAge"
    )
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          parent: {
            status: "wrong mail",
          },
        });
      }

      bcrypt
        .compare(req.body.password, user.parentPassword)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(404).json({
              parent: {
                status: "wrong password",
              },
            });
          }

          Student.find({ studentParent: user._id })
            .select(
              "_id studentName studentUserName studentAge studentPic studentGrade studentPassword taskCounter"
            )
            .then((children) => {
              const responseData = {
                parent: {
                  status: "correct password",
                  _id: user._id,
                  parentName: user.parentName,
                  parentMail: user.parentMail,
                  parentPhoneNumber: user.parentPhoneNumber,
                  parentAge: user.parentAge,
                  parentProfilePic: user.profilePictureUrl,
                },
                children: children.map((child) => ({
                  _id: child._doc._id,
                  studentName: child._doc.studentName,
                  studentUserName: child._doc.studentUserName,
                  studentAge: child._doc.studentAge,
                  studentPic: child._doc.studentPic,
                  studentGrade: child._doc.studentGrade,
                  studentPassword: child._doc.studentPassword,
                  taskCounter: child._doc.taskCounter,
                })),
              };

              res.status(200).json(responseData);
            })
            .catch((err) => {
              res.status(404).json({
                massage: err,
              });
            });
        })
        .catch((err) => {
          res.status(404).json({
            massage: "err",
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

const updateParentInfo = async function (req, res, next) {
  try {
    const parent = await User.findById(req.params.id);

    if (!parent) return res.status(404).send("no parent with such id");

    let newData = { ...req.body };

    if (req.file) {
      newData = { ...newData, parentPic: req.file.path };
    }

    await User.findByIdAndUpdate(req.params.id, newData, { new: true })
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    return res.status(500).send(err);
  }

  // User.find({ _id: req.params.id })
  //   .then((user) => {
  //     User.find({ parentMail: req.body.newmail })
  //       .then((result) => {
  //         if (result.length < 1 || (result.length === 1 && result[0]._id.equals(req.params.id))) {
  //           const parent = {
  //             parentMail: req.body.newmail,
  //             parentName: req.body.newname,
  //             parentAge: req.body.newage,
  //             parentPhoneNumber: req.body.newphonenumber,
  //           };
  //           if (req.file) {
  //             parent.parentPic = req.file.path;
  //           }
  //           User.updateOne({ $set: parent })
  //             .then((result) => {
  //               res.status(202).json({
  //                 massage: "updated successfully",
  //               });
  //             })
  //             .catch((err) => {
  //               res.status(404).json({
  //                 massage: err,
  //               });
  //             });
  //         } else {
  //           res.status(404).json({
  //             massage: "mail already exists",
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(404).json({
  //           massage: err,
  //         });
  //       });
  //   })
  //   .catch((err) => {
  //     res.status(404).json({
  //       massage: "error in parent id ",
  //     });
  //   });
};

const forgotPassword = async (req, res, next) => {
  try {
    // Get the base URL of your application
    const baseUrl = `${req.protocol}://${req.headers.host}`;

    // Find the parent by their email
    const parent = await User.findOne({ parentMail: req.body.email });
    console.log(parent);

    // If the parent doesn't exist, return an error
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString("hex");

    // Update the parent's reset token and expiration date
    parent.resetToken = token;
    parent.resetTokenExpiration = Date.now() + 1800000; // Token will expire in 1 hour

    // Save the parent's updated data
    await parent.save();
    console.log(parent);
    // Send an email to the parent with a link to reset their password
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // For example, using Gmail SMTP:
      host: "smtp.eu.mailgun.org",
      port: "465",
      secure: true, // For SSL
      auth: {
        user: "postmaster@mg.gamelearning.me",
        pass: "af6dc4f27a08291aa50f3035f5b4be2a-262b213e-20b59c7b",
      },
    });

    const mailOptions = {
      from: "noreply@mg.gamelearning.me",
      to: parent.parentMail,
      subject: "Password Reset Request",
      html: `
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link, or paste it into your browser to complete the process:</p>
        <a href="http://www.gamelearning.me/resetPassword/${token}">Reset Password</a>
        <p>This link will expire in 30 minutes.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Return a success message
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    // Return an error message
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // Find the parent by their reset token and check the expiration date
    const parent = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    // If the parent doesn't exist or the reset token has expired, return an error
    if (!parent) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the parent's password
    const parentPassword = req.body.pass;
    console.log(parentPassword);
    const hashedPassword = await bcrypt.hash(parentPassword, 10);
    parent.parentPassword = hashedPassword;
    parent.resetToken = undefined;
    parent.resetTokenExpiration = undefined;

    // Save the parent's updated data
    await parent.save();

    // Return a success message
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    // Return an error message
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(202).json({
        message: "account successfully deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

module.exports = {
  SignIn,
  SignUp,
  updateParentInfo,
  forgotPassword,
  resetPassword,
  deleteAccount,
  upload,
};
