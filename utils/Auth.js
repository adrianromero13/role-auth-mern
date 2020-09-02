const User = require('../models/User');
const bcrypt = require('bcryptjs');


/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */

const userRegister = async (userDets, role, res) => {
  try {
    // validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }
    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const hashedPassword = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "YES! you are now successfully registered. Please now login"
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: 'Unable to create your account.',
      success: false
    })
  }
};

const validateUsername = async (username) => {
  let user = User.findOne({ username });
  return user ? false : true;

};
const validateEmail = async (email) => {
  let user = User.findOne({ email });
  return user ? false : true;

};


module.exports = {
  userRegister,
};
