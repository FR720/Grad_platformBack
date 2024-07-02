const Data = require("../models/Datadb");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const FBQuestion = require("../models/Feedback");
const multer = require("multer");

const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./Image");
  },
  filename: function (req, file, call) {
    call(null, `${uuid.v4().replace(/-/g, "")}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

// Combined endpoint for inserting data with or without picture
InsertData = function (req, res, next) {
  try {
    const Schema = Joi.object({
      grade: Joi.number().min(1).max(12).required(),
      subject: Joi.string().required(),
    });
    const { error } = Schema.validate({
      grade: req.body.grade,
      subject: req.body.subject,
    });
    if (error) return res.status(400).send(error.details[0].message);

    const parentId = req.params.id;
    const gradeNo = req.body.grade;
    const subjectName = req.body.subject;

    // Check if the data already exists for the specific parent
    // Data.findOne({
    //   parentId,
    //   gradeNo,
    //   subjectName,
    //   definitionInAc: req.body.wordar,
    //   definitionInEn: req.body.worden,
    //   sentence: req.body.sentence,
    //   numbers: req.body.number,
    //   choices: req.body.choices,
    //   type: req.body.type,
    // })
    //   .then((existingData) => {
    //     if (existingData) {
    //       return res.status(400).json({
    //         message: "Data already exists for this parent.",
    //       });
    //     }

    let dataObj = {
      parentId: parentId,
      gradeNo: gradeNo,
      subjectName: subjectName,
      definitionInAc: req.body.wordar,
      definitionInEn: req.body.worden,
      sentence: req.body.sentence,
      numbers: req.body.number,
      choices: req.body.choices ? req.body.choices : [],
      type: req.body.type ? req.body.type : "word",
    };

    // If there is a file in the request, add the imageUrl to the data object
    if (req.file) {
      dataObj.imageUrl = req.file.path;
    }

    const data = new Data(dataObj);

    data
      .save()
      .then((inserting) => {
        res.status(200).json({
          status: "Question inserted successfully.",
        });
      })
      .catch((err) => {
        res.status(404).json({
          message: err,
        });
      });
    // })
    // .catch((err) => {
    //   res.status(500).json({
    //     message: "An error occurred while checking for existing data.",
    //     error: err,
    //   });
    // });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

TakeData = async function (req, res, next) {
  try {
    // const user = await Data.findOne({ parentId: req.params.id });

    // if (!user) {
    //   return res.status(200).json([]);
    // }

    const data = await Data.find({
      parentId: req.params.id,
      gradeNo: req.body.grade,
      subjectName: req.body.subject,
    });
    if (data.length < 1) {
      res.status(200).json([]);
    } else {
      return res.status(200).send(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error fetching data.",
      error: err.message,
    });
  }
};

UpdateData = function (req, res, next) {
  const dataObj = {
    parentID: req.params.id,
    gradeNo: req.body.grade,
    subjectName: req.body.subject,
    definitionInAc: req.body.wordar,
    definitionInEn: req.body.worden,
    sentence: req.body.sentence,
    numbers: req.body.number,
    choices: req.body.choices ? req.body.choices : [],
  };

  // If there is a file in the request, add the imageUrl to the data object
  if (req.file) {
    dataObj.imageUrl = req.file.path;
  }

  const updateData = { $set: dataObj };

  Data.findByIdAndUpdate(req.params.dataId, updateData, { new: true })
    .then((updatedData) => {
      res.status(200).json({
        message: "Data updated successfully.",
        updatedData: updatedData,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error updating data.",
        error: err,
      });
    });
};

DeleteData = function (req, res, next) {
  Data.findByIdAndDelete(req.params.dataId)
    .then((deletedData) => {
      if (deletedData) {
        res.status(200).json({
          message: "Data deleted successfully.",
          deletedData: deletedData,
        });
      } else {
        res.status(404).json({
          message: "Data not found.",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error deleting data.",
        error: err,
      });
    });
};

module.exports = {
  InsertData: InsertData,
  TakeData: TakeData,
  UpdateData: UpdateData,
  DeleteData: DeleteData,
  upload: upload,
};
