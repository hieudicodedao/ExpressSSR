const db = require("../db")
const randomstring = require('randomstring')
module.exports.transfer = (req,res) => {
    res.render('Transfer/index',{
        csrfToken : req.csrfToken()
    })
}

module.exports.postTransfer = (req,res) =>{
    let scookie = req.signedCookies
    let isExist = false
    for(cookieItem in scookie){
        if(cookieItem === 'userID')  isExist = true
    } 
    if(!isExist) res.redirect('/auth/login')
    else{
        let userID = req.signedCookies.userID
        let data = {
            id : randomstring.generate(),
            sender_id : userID,
            sented_id : req.body.acccode,
            amount : parseInt(req.body.amount)
        }
        db.get('transfer').push(data).write()
        res.redirect('/users')
    }
}