/* THIS FUNC ACTS AS MIDDLE WARE TO ALLOW ONLY AUTHENTIC USERS TO ACCESS RESTRICTED ROUTES */

module.exports= function (req,res,next){
    console.log("res.user:\n",req.user);
    if(!req.user){
        res.redirect('/user/signin');
    }else{
        next();
    }
}