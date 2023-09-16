const fs = require("fs");

const errorLogger = (err, req, res, next) => {
    if(err){
        const errorMessage = " " + new Date() + " : " + err.stack + "\n"; 
        fs.appendFile('errorLogger.txt',errorMessage,(err)=>{
            if(err){
                console.log(err);
            }
        });
        if(err.status){
            res.status(err.status);
        }else res.status(500)
        res.json({status:"fail",message:err.message});
    }
    next()
};

module.exports = errorLogger;