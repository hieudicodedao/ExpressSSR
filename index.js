require("dotenv").config();
let express = require("express");
let csurf = require('csurf')
let { render } = require("pug");
let app = express();
let port = 3000;


//middle ware for csurf tokens

var csurfProtection = csurf({cookie : true})

// body parser
  let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//view engine
app.set("view engine", "pug");
app.set("views", "./views");

//set static folder
app.use("/public", express.static("public"));

//cookie parser
let cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// require middleware login
let isLogined = require("./middle-ware/login-middleware");
let checkSession = require('./middle-ware/checksession')

// require router
let useRoutesUser = require("./routes/user.router");
let useRoutesAuth = require("./routes/auth.router");
let useRoutesProduct = require('./routes/product.router')
let useRoutesCart = require('./routes/cart.router')
let userRoutesTransfer = require('./routes/transfer.router')
//
//check for all router session ,if didnt have then set them session
// app.use(checkSession)





app.get("/", checkSession ,(req, res) => {
  res.render("index");
});
app.use("/users", checkSession,isLogined.checkUserCookie, useRoutesUser);
app.use("/auth", checkSession,useRoutesAuth);
app.use("/products", checkSession ,useRoutesProduct);
app.use('/cart',checkSession , useRoutesCart)
app.use('/transfer', checkSession, csurfProtection , userRoutesTransfer)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

