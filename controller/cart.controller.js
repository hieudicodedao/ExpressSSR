let db = require('../db')
module.exports.add = (req,res) =>{
    let product_id = req.params.id
    let session_ID = req.signedCookies.session_ID
    let count = (! db.get('session').find({id : session_ID}).get('cart.' + product_id).value()) 
        ? 0 
        : db.get('session').find({id : session_ID}).get('cart.' + product_id).value()
    db.get('session')
        .find({id : session_ID})
        .set('cart.' + product_id ,parseInt(count)+1)
        .write()
    res.redirect('/products')
}