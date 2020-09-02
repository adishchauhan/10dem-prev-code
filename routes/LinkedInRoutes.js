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
router.get("/linkedin", passport.authenticate('linkedin',{
    scope:['r_liteprofile','r_emailaddress']
}));

//callback from fb
router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>{
    res.redirect('/user/dashboard');
});

module.exports = router;