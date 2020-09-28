const express = require('express')
const app = express();
//randomstring for ID
const randomstring = require('randomstring')
var db = require('../db')
//md5 hash password
const md5 = require('md5')
///
module.exports.users = ((req, res)=>{
    let users = db.get('users').value()
    res.render('User/users',{
        users : users
    })
})
module.exports.search = ((req,res)=>{
        let q = req.query.q
        let users = db.get('users').value()
        let filterUser = users.filter((user)=>{
            return user.name.indexOf(q) !== -1
        })
        res.render('User/users',{
            users : filterUser
        })
    })
module.exports.createUser = ((req,res)=>{
    res.render('User/create-user');
})
module.exports.viewdetails = ((req,res)=>{
    let id = req.params.id
    let user = db.get('users').find({id : id}).value()
    res.render('User/viewdetails-user',{
        user : user
    })
})
module.exports.postCreateUser = ((req,res)=>{
    let obj = req.body
    req.body.avatar = req.file.path
    obj.id = randomstring.generate()
    obj.password = md5(obj.password)
    let users = db.get('users')
    users.push(obj).write();
    res.redirect("/users")
})

module.exports.signout = (req,res) =>{
    res.clearCookie('userID')
    res.redirect('/auth/login')
}