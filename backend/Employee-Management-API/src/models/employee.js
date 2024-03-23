const mongoose = require('mongoose');

const tEmployeeSchema = new mongoose.Schema({
  f_Id: { type: Number, unique: true },
  f_Image: { type: String },
  f_Name: { type: String, required: true },
  f_Email: { type: String, unique: true },
  f_Mobile: { type: String },
  status: { type: String },
  f_Designation: { type: String },
  f_gender: { type: String },
  f_Course: { type: String },
  f_Createdate: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true } 
});

// Define a pre-save hook to generate the auto-incrementing value for f_Id field
tEmployeeSchema.pre('save', async function(next) {
  try {
    // Check if f_Id field already exists, if not, generate the next auto-incrementing value
    if (!this.f_Id) {
      const latestEmployee = await this.constructor.findOne({}, {}, { sort: { 'f_Id': -1 } });
      this.f_Id = latestEmployee ? latestEmployee.f_Id + 1 : 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('t_Employee', tEmployeeSchema,'t_Employee');
