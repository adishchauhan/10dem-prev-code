const passport = require('passport'),
      lInStart = require('passport-linkedin-oauth2').Strategy;

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
    new lInStart(
        {
            clientID: process.env.LINKEDIN_KEY,
            clientSecret: process.env.LINKEDIN_SECRET,
            callbackURL: "/auth/linkedin/redirect"  
        },
        function(accessToken, refreshToken, profile,done){
            //a func
            console.log('linkedIN callback: ',profile);

            Educator.findOne({uid: profile.id},(err,currUser)=>{
                if(err){
                    console.log('Error finding the user');
                    done(null, false, { message: 'Error with DB' })
                }
                 // is user exists
                if(currUser){
                    console.log(currUser.fullName);
                    //pass for serialization
                    done(null,currUser);
                }
                else{
                    const newEducator = {
                        authType:'LinkedIn',
                        fullName:profile.displayName,
                        isValidatedUser:true,
                        email:'',
                        password:'',
                        uid:profile.id,
                        picture:profile.photos[0].value
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