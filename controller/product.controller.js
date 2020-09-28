var randomstring = require('randomstring')
var db = require('../db')
module.exports.showListProduct = (req,res) => {
    let q = req.query.q || 1 
    // 12 per page
    let products = db.get('products').value();
    let perpage = 12
    let session_ID = req.signedCookies.session_ID
    let cart = db.get('session').find({id : session_ID}).get('cart').value()
    let  numberItems= 0
    for(let item in cart){
        numberItems += cart[item]
    }
    let show12perpage = products.slice((q-1)*perpage  , (q-1)*perpage + perpage)
    res.render('Product/showListProduct',{
        items : show12perpage,
        numberItems : numberItems
    })
}