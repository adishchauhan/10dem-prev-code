/*----------------------- CONSTS / VARS --------------------*/

        // requiring env variables
    require('dotenv').config();

        // requiring dependencies
    const express      = require('express'),
          app          = express(),
          mongoose     = require('mongoose'),
          bodyParser   = require('body-parser'),
          session      = require('express-session'),
          MongoStore   = require('connect-mongo')(session),
          passport     = require('passport');

        // requiring custom routes
    const UserRoutes     = require('./routes/UserRoutes'),
          LocalAuth      = require('./routes/LocalAuth'),
          GoogleRoutes   = require('./routes/GoogleRoutes'),
          FacebookRoutes = require('./routes/FacebookRoutes'),
          LinkedInRoutes = require('./routes/LinkedInRoutes');
         

        // automatically running passport.use functions for Oauth within each file
    const GoogleOauth   = require('./authentications/GoogleAuthentication'),
          FacebookOauth = require('./authentications/FacebookAuthentication'),
          LinkedInOauth = require('./authentications/LinkedInAuthentication');
         

        // PORT
    const PORT = process.env.PORT || 8085;



/*----------------------- FUNCTIONS / MIDDLEWARES --------------------*/

        // enabling node to read static files from within the root of backend e.g: css, images, js
    app.use(express.static('public'));

    app.use(session({
        name:'10demCookies',
        saveUninitialized:false,
        secret: process.env.TOKEN_SECRET,
        resave: false,
        saveUninitialized: true,
        store:new MongoStore({
            url: 'mongodb://localhost/test-app',
            autoRemove: 'native', 
            secret: process.env.MONGOSTORE_SECRET
        }),
        cookie: { 
            secure: false,  // set it to true in production
            maxAge: 10000,  // 10 sec
            sameSite: true, 
        }
      }))

    app.use(passport.initialize());
    app.use(passport.session());

        // setting the view engine to render 'ejs' files
    app.set('view engine', 'ejs');

        // parsing the URL encoded data in JSON format
    app.use(bodyParser.urlencoded({extended:true}));



/*----------------------- ALL ROUTES ------------------------------*/

    app.use('/user', UserRoutes); //eg: [www.xyz.com]/user[/whatever]
    app.use('/auth', LocalAuth); //eg: [www.xyz.com]/auth/local/[/whatever]
    app.use('/auth', GoogleRoutes); //eg: [www.xyz.com]/auth/google/[/whatever]
    app.use('/auth', FacebookRoutes); //eg: [www.xyz.com]/auth/facebook/[/whatever]
    app.use('/auth', LinkedInRoutes); //eg: [www.xyz.com]/auth/linkedin/[/whatever]
    

        // basic landing route for now
    app.get("*", (req,res)=>{
        res.redirect('/user/signin');
    });

/*----------------------- CALLING SERVER ------------------------------*/

    app.listen(PORT, ()=>{
        // to start the server, just type 'nodemon'
        console.log("SERVER started @port : ",PORT);
        try {
            mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex:true })
                .then(res=>{
                    console.log("Connected to DB ");
                })
                .catch(error=>{
                    console.log("Error Occured: ",error.message);
                })
        } catch (error) {
            console.log("Error Occured: ",error.message);
        }
    });