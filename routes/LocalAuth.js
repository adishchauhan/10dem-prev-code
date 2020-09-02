/* THIS IS THE USERNAME AND PASSWORD AUTHENTICATION FILE */
    require('dotenv').config();

    // required consts and variables
const router                  = require('express').Router(),
      bcrypt                  = require('bcrypt'),
      validator               = require('validator'),
      verify                  = require('../functionalities/VerifyUserCredentials'), // user credential verify function
      verifyUserPresence      = require('../functionalities/VerifyCookie'); // cookie
      

const saltRounds = 10, // random no. b/w 10-40
            salt = bcrypt.genSaltSync(saltRounds);

    // requires mongoose model
const Educator = require('../modelsAndSchema/Educator');


/* -------------------- MIDDLEWARE ------------------ */



/* -------------------- LOGIN USING USERNAME AND PASSWORD ------------------ */
    /* 
        work on login route and use passport.js for better integration
    */
// router.post('/local/signin',(req,res)=>{
    
//     const { email,pass } = req.body;

//     // if not a valid email
//     if(!validator.isEmail(email)){
//         res.render('signin',{type:'email',error:'Invalid Email'})
//     }
//     else{
//        // email is valid
//        try {
//            Educator.findOne({email:email}, async (err,User)=>{
//                if(err){
//                     res.render('signin',{type:'user',error:'Error Occured'});                  
//                }
//                if(!User){
//                    res.render('signin',{type:'user',error:'No such user exists'})
//                }
//                else{
//                         // if the user exists, match the DB password with, current password
                    
//                     const match = await bcrypt.compareSync(pass, User.password);
//                         // if password didn't match
//                     if(match==false){
//                         res.render('signin',{type:'user',error:'Either the username or password is incorrect'})
//                     }
//                     else{
//                         // if the password matches 
//                         //set cookie and session for user with user ID
//                         console.log(User._id);
//                         req.session.userId = User._id;
//                         res.redirect('/user/dashboard');
//                     }
//                }
//            })
//        } catch (error) {
//            console.log("signin error: \n",error.message);
//            res.render('signin',{type:'user',error:'Error Occured'});
//        }
//     }
// });

/* -------------------- SIGN-UP USING USERNAME AND PASSWORD ------------------ */

router.post('/local/signup',(req,res)=>{
    const { name,email,pass } = req.body;
    const verfiedObj = verify(name,email,pass);
    
    if(!verfiedObj.isValid){
        console.log(verfiedObj);
        res.render('signup',{type:verfiedObj.type, error:verfiedObj.errorMessage});
    }
    else{
        // if we are here, means all the User credentials have been verified and 
        // we can now store it in DB
        let newPass = bcrypt.hashSync(pass,salt);
        const newEducator = {
            authType:'UsernameAndPassword',
            fullName:name,
            isValidatedUser:false,
            email:email,
            password:newPass,
        };

        try {
            // search if the user already exists
            Educator.findOne({email:email}, function(err,user){
                    // means user already exists with this email
                if(err){
                    console.log(err.message);
                    res.render('signup',{type:'creation',error:`Error Occured`});                    
                }
                if(user){
                    console.log("Attempt to create another account using email: ",email);
                    res.render('signup',{type:'creation',error:`'${email}' is already registered`});
                }
                else{  // means no such user found
                    Educator.create(newEducator, (err,db_res)=>{
                        if(err){
                            console.log(err.message);
                            res.render('signup',{type:'creation',error:`Error Occured`});
                        }
                        else{
                            console.log('new educator added:\n',db_res);

                            res.redirect('/user/signin');
                        }
                    })
                }
            })
        } catch (error) {
            console.log("caught error signUP: ",error.message);
            res.render('signup',{type:'creation',error:`Error Occured`});
        }        
    }
});



/* -------------------- EXPORTING ABOVE ROUTES ------------------ */
module.exports = router;