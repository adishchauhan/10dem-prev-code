const   validator         = require('validator'),
        passwordValidator = require('password-validator');

/* -------------------- MIDDLEWARES/FUNCTIONS ------------------ */

    // function to match the password strength
    function passWordSchema(pass){
        var schema = new passwordValidator();
        schema
        .is().min(8)                                    // Minimum length 8
        .is().max(15)                                  // Maximum length 100
        .has().uppercase(1)                              // Must have uppercase letters atleast 3 characters
        .has().lowercase(1)                              // Must have lowercase letters atleast 3 characters
        .has().digits(1)                                // Must have at least 1 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    
        passwordError = schema.validate(pass,{ list: true });
        if(passwordError.length>0)
            return false;
    
        return true ;    // returns an array of error fields
    }
    
        // function to validate the name
    function fullNameSchema(name){
        let re = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
        if(!re.test(name))
            return false;
    
        return true;     // returns an empty array of no error fields
    }
    
        // function to verify all the details and redirect based on that
    const verify = (name,email,pass)=>{
        
        name+='';
        email+='';
        pass+='';
        // object to store the veification result
        const verifiedObj ={
            isValid:true,
            errorMessage:'',
            type:''
        }
    
        if(validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(pass)){
            verifiedObj.isValid = false;
            verifiedObj.errorMessage = 'One or more field(s) blank';
            verifiedObj.type = 'global';
            return verifiedObj;
        }
        else{
                // if name is not alphanumeric or name length is less than 7
                let nameErrorsReceived =  fullNameSchema(name);  // returns an array
            if(nameErrorsReceived==false){
                // not valid name
                verifiedObj.isValid = false;
                verifiedObj.errorMessage = 'Invalid full name input';
                verifiedObj.type = 'name';
                return verifiedObj;
            }
    
                // if not a valid email
            if(!validator.isEmail(email)){
                verifiedObj.isValid = false;
                verifiedObj.errorMessage = 'Invalid email input';
                verifiedObj.type = 'email';
                return verifiedObj;
            }
            
                // if password doesnot contain atleast one character
            let errorsReceived =  passWordSchema(pass);  // returns an array
            if(errorsReceived == false){
                verifiedObj.isValid = false;
                verifiedObj.errorMessage = 'Invalid password input';
                verifiedObj.type = 'pass';
                return verifiedObj;
            }
    
                // once we reach here, it means name, email and password are fully verified
                // and we can add our user to DB
        }
    
        return {
            isValid:true,
            errorMessage:['Sign Up Successful'],
        }
    }
    

/* ------------------------ MODULE EXPORTS ------------------- */

module.exports = verify;