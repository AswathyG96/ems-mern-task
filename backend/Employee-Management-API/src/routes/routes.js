
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');


const fileFilter = (req, file, cb) => {
  // Get the file extension
  const extname = path.extname(file.originalname).toLowerCase();
  
  // Allowed file extensions
  const allowedExtensions = ['.jpg', '.png'];
  
  // Check if the file extension is included in the allowed extensions array
  if (allowedExtensions.includes(extname)) {
      // Accept the file
      cb(null, true);
  } else {
      // Reject the file with an error message
      cb(new Error('Only .jpg and .png files are allowed'));
  }
};

const handleUploadError = (req, res, next) => {
  upload.single('f_Image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file filter rejected the file)
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // An unexpected error occurred
      return res.status(500).json({ error: err.message });
    }
    // If no error occurred, proceed to the next middleware (i.e., the route handler)
    next();
  });
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) { 
      cb(null, 'uploads/'); // Define the destination folder for uploaded images
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Define the filename for uploaded images
    }
  });
  
  // Multer upload configuration
  const upload = multer({ storage: storage, fileFilter: fileFilter });
// POST /login

router.post('/login', loginController.login);

router.use(authMiddleware);

// router.post('/employees', upload.single('f_Image'), employeeController.createEmployee);
router.post('/employees', handleUploadError, employeeController.createEmployee);


router.put('/edit-employees/:f_Id', handleUploadError, employeeController.updateEmployee);
// GET /api/v1/employees
router.get('/list-employees', employeeController.listEmployees);

router.delete('/delete-employee/:f_Id', employeeController.deleteEmployee);

router.get('/getemployees/:f_Id', employeeController.getAnEmployeeDetail);

module.exports = router;