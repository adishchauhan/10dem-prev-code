const passport = require('passport');

const router = require('express').Router();



//login
router.get("/login",(req,res)=>{
    res.render('login');
});
//logout
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect('/'); //home page
});

//connecting with google route
router.get("/google", passport.authenticate('google',{
    scope:['email','profile']
}));

//callback from google
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/user/dashboard');
});

module.exports = router;