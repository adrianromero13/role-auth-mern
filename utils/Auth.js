const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');


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
    const password = await bcrypt.hash(userDets.password, 12);
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
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

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: 'Username is not found. Invalid login credentials.',
      success: false
    });
  }
  // Check the role 
  if (user.role != role) {
    return res.status(403).json({
      message: 'Please make sure you are logging in from the right portal.',
      success: false
    });
  }
  // That means user is existing and trying to signin from the right portal
  // check password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // sign in the token and issue to user
    let token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      }, SECRET, { expiresIn: '7 days' }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token,
      expiresIn: 168
    };

    return res.status(200).json({
      ... result,
      message: 'You successfully logged in',
      success: true,
    });

  } else {
    return res.status(403).json({
      message: 'Wrong password',
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;

};
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;

};

module.exports = {
  userRegister,
  userLogin,
};
