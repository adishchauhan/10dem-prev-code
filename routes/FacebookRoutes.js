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

//connecting with fb route
router.get("/facebook", passport.authenticate('facebook',{
    scope:'email'
}));

//callback from fb
router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
    res.redirect('/user/dashboard')
});

module.exports = router;