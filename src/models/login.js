// t_login.js

const mongoose = require('mongoose');

// Define the schema for the t_login model
const tLoginSchema = new mongoose.Schema({
  f_sno: { type: Number, unique: true, required: true },
  f_userName: { type: String, required: true },
  f_Pwd: { type: String, required: true }
});

// Create and export the t_login model
module.exports = mongoose.model('t_login', tLoginSchema,'t_login');
