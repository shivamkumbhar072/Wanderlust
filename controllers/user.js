
const User = require('../models/user.js');
module.exports.signUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wanderlust!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.login = async(req, res) => {
    req.flash('success', 'Welcome back!');
    if(res.locals.returnTo){
        return res.redirect(res.locals.returnTo);
    }
    else{
        res.redirect('/listings');
    }
};

module.exports.logout = (req, res,next) => {
    req.logout((err) =>{
        if (err) { return next(err); }
        req.flash('success', 'You are logged out!');
        res.redirect('/listings');
    });
};



