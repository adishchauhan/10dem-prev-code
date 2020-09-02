const passport = require('passport'),
      fbStart = require('passport-facebook').Strategy;
     
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
    new fbStart(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/redirect"  
        },
        function(accessToken, refreshToken, profile,done){
            console.log('facebook callback initiated');
            //a func
            Educator.findOne({uid: profile.id},(err,currUser)=>{
                if(err){
                    console.log('Error finding the user');
                    done(null, false, { message: 'Error with DB' })
                }
                 // is user exists
                if(currUser){
                    console.log(currUser.fullName+' logged in using FB');
                    //pass for serialization
                    done(null,currUser);
                }
                else{
                    const newEducator = {
                        authType:'Facebook',
                        fullName:profile.displayName,
                        isValidatedUser:true,
                        email:'',
                        password:'',
                        uid:profile.id,
                        picture:''
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