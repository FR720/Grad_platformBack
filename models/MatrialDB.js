const mongoose = require("mongoose");

const MatrialSchema = new mongoose.Schema(
  {

    doctorMailM: {
      type: String,
      required: true,
     
    },
    subjectNameM: {
      type: String,
      required: true,

    },
    matrialPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Matrial", MatrialSchema);
