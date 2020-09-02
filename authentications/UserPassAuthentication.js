const passport = require('passport'),
      LocalStart = require('passport-local').Strategy;

      // Eduator
    const Educator = require('../modelsAndSchema/Educator');

passport.serializeUser(function(user, done) { 
    // In serialize user we decide what to store in the session. 
    // Here we are storing the user id only.
    // (small and unique value)
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) { 
    // Here we retrieve all the info of the user from the
    // session storage using the user id stored in the 
    // session earlier using serialize user.
    Educator.findById(id)
        .then(user=>{
            //done here, then pass whole 'user' to next stage
            done(null,user);
        })
        .catch(error=>{
            done(null,false,{ message: error.message })
        })
});

    // check if user exists
passport.use(
    new LocalStart(function(email, pass, done) {
    Educator.findOne({email:email},function(err,User){
        if(err){
            return done(null, false, { message: 'Error with DB' });//wrong roll_number or password; 
        }
        var pass_retrieved = User.password;
        bcrypt.compare(pass, pass_retrieved, function(err, correct) {
              if(err){
                return done(null,false,{message:'Incorrect username or Password'});  // wrong password
            }       
            if(correct){
                return done(null,User);
            } 
        });
    });
}));