let db  = require('../db')
let randomstring = require('randomstring')
module.exports = (req,res,next) =>{
    sessionID = req.signedCookies.session_ID
    if(!sessionID){
        let sessionID = randomstring.generate()
        res.cookie('session_ID',sessionID,{
            signed : true 
        })
        if(req.signedCookies.sessionID) next();
        db.get('session').push({
            id : sessionID
        }).write()
    }
    next();
}   