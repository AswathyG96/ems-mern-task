const mongoose = require('mongoose');


const dbURI = 'mongodb+srv://anandhu:Bm6siwazfWpbb27i@cluster0.fuapshf.mongodb.net/EmployeeDB?retryWrites=true&w=majority';


// Connect to MongoDB
const conn = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


module.exports = conn;