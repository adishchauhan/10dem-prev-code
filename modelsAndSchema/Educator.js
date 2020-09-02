const mongoose = require('mongoose');

/* --------------------- SCHEMA------------------ */
    /*
        authType: represents whether authentication is done via username-password or Oauth
    */
const educatorSchema = new mongoose.Schema({
    authType:String,
    fullName:String,
    isValidatedUser:Boolean,
    email:String,
    password:String,
    uid:{type: String, default:''},
    picture:String,
    createdOn: {type: Date, default:Date.now()},
});

/* --------------------- MODEL ------------------ */

const Educator = mongoose.model('editor',educatorSchema); //'editor' will be the collection formed in the DB


/* --------------------- Exporting Model ------------------ */

module.exports =  Educator;