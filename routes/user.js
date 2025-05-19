const express = require('express');
const { route } = require('./listing');
const ExpressError = require('../utils/expressErrors.js');
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const router = express.Router();
const { saveReturnTo } = require('../middleware.js');
const userController = require('../controllers/user.js');
const user = require('../models/user.js');


router.route('/signup')
.get((req, res) => {
    res.render('users/signup')
})
.post(wrapAsync(userController.signUp));


router.route('/login')
.get( (req, res) => {
    res.render('users/login');
})
.post(saveReturnTo,passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.login);


router.get('/logout', userController.logout);
module.exports = router;