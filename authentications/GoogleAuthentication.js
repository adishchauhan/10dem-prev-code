const passport = require('passport'),
      googleStart = require('passport-google-oauth20').Strategy;

const Educator = require('../modelsAndSchema/Educator');
     
//run automatically
require('dotenv').config();

//strategy

// //deserialize user        retrieve 'id' from cookie and check for user
passport.deserializeUser((id,done)=>{
    Educator.findById(id)
        .then(user=>{
            //done here, then pass whole 'user' to next stage
            done(null,user);
        })
        .catch(error=>{
            done(null,false,{ message: error.message })
        })
})



// //serialize user        user.id == user._id
passport.serializeUser((user,done)=>{
    //done here, then inject user.id to cookies 
    done(null,user.id);
})

//passport func.
passport.use(
    new googleStart(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect"  
        },
        function(accessToken, refreshToken, profile,done){
            console.log('google callback initiated');
            //before creating new users, check if they already exist
            // profile._json.sub : consists of user's google ID
            Educator.findOne({uid: profile._json.sub},(err,currUser)=>{
                if(err){
                    console.log('Error finding the user');
                    done(null, false, { message: 'Error with DB' })
                }
                 // is user exists
                if(currUser){
                    console.log(currUser.email);
                    //pass for serialization
                    done(null,currUser);
                }
                else{
                    const newEducator = {
                        authType:'Google',
                        fullName:profile._json.name,
                        isValidatedUser:true,
                        email:'',
                        password:'',
                        uid:profile._json.sub,
                        picture:profile._json.picture
                    };
                            //create new user
                    Educator.create(newEducator)
                    .then(newUser=>{
                        console.log('db res create: ',newUser);
                        //serializing new user
                        done(null,newUser);
                    })
                    .catch(err=>console.log('db err create: ',err.message))
                }
            })
            
        }
    )
)