const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser("afdasfflasdjf927982"))
//lowdb database
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json')
var db = low(adapter)
db.defaults({users : []})
  .write()
module.exports.checkUserCookie = (req,res,next) =>{
    let id = req.signedCookies.userID
    if(!id){
        res.redirect('/auth/login')
        return;
    }
    res.locals.user = db.get('users').find({id : id}).value();
    next()
}