const router = require('express').Router();

// Bring in the User Regisration function
const { userRegister } = require('../utils/Auth');

// users registration route
router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res);

});
// admin registration route
router.post('/register-admin', async (req, res) => {

});

// superadmin registration route
router.post('/register-superadmin', async (req, res) => {

});


// users login route
router.post('/login-user', async (req, res) => {

});
// admin login route
router.post('/login-admin', async (req, res) => {

});
// superadmin login route
router.post('/login-superadmin', async (req, res) => {

});


// profile route
router.get('profile', async(req, res) => {});

// users Protected route
router.post('/user-protected', async (req, res) => {

});
// admin Protected route
router.post('/admin-protected', async (req, res) => {

});
// superadmin Protected route
router.post('/superadmin-protected', async (req, res) => {

});
module.exports = router;
