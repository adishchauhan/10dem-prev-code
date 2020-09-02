    // works like mini 'app.(get/post/put...)'
const router             = require('express').Router(),
      verifyUserPresence = require('../functionalities/VerifyCookie'); // cookie verify function


/* -------------------- MIDDLE WARE ------------------ */

function isUserAlreadyLoggedIn(req,res,next){
    // take help of session.userId because we have stored the user id there
    if(!req.user){
        // go on
        next();
    }else{
        return res.redirect('/user/dashboard');
    }
}
      
/* -------------------- ANY USER ROUTES ------------------ */

    // LOGIN or SIGNIN ROUTE
router.get('/signin',isUserAlreadyLoggedIn,(req,res)=>{
    res.render('signin',{type:'',error:''});
});

    // SIGNUP ROUTE
router.get('/signup',(req,res)=>{
    res.render('signup',{type:'',error:''});
});

    // HOME PAGE or LANDING PAGE
router.get('/dashboard',verifyUserPresence,(req,res)=>{
    res.render('index');
})

    // LOGOUT
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/user/signin');
})


/* -------------------- EXPORTING ABOVE ROUTES ------------------ */
module.exports = router;