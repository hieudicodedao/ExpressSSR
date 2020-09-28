const express = require('express') 
const app = express()
var db  = require('../db')
//md5 hash password
const md5 = require('md5')
module.exports.login = (req,res) =>{
    res.render('Auth/login')
}

module.exports.postLogin = (req,res) =>{
    let input_email = req.body.input_email
    let find_email = db.get('users').find({email : input_email}).value()

    if(!find_email){
        res.render('Auth/login',{
            errors : [
                "Email is not exist!"
            ],
            last_input : req.body
        })
        return;
    }
    let input_password = md5(req.body.input_password)
    if(input_password !== find_email.password){
        res.render('Auth/login',{
            errors : [
                "Password is wrong!"
            ],
            last_input : req.body
        })
        return;
    }
    
    res.cookie('userID',find_email.id,{
        signed : true
    })
    
    res.redirect('/users')
}