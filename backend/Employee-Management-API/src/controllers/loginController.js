// controllers/loginController.js

const loginService = require('../services/loginService');

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await loginService.login(userName, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
