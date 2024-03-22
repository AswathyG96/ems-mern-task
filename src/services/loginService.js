const jwt = require('jsonwebtoken');
const login = require('../models/login');

exports.login = async (userName, password) => {
    // Placeholder login logic
    const user = await login.find({f_userName: userName,f_Pwd: password});
  
    if (user.length > 0) {
    const username = user[0].f_userName
      // Generate access token

      const accessToken = jwt.sign({ userId: user.f_userName }, 'my_secret_key', { expiresIn: '15m' });

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user. f_userName }, 'your_refresh_secret_key', { expiresIn: '7d' });
 
      return {
        username,
        accessToken,
        accessTokenExpiresIn: Date.now() + 15 * 60 * 1000, // Calculate expiration time in milliseconds
        refreshToken,
        refreshTokenExpiresIn: Date.now() + 7 * 24 * 60 * 60 * 1000, // Calculate expiration time in milliseconds
        message: 'Login successful'
    };
    } else {
      throw new Error('Invalid credentials');
    }
  };