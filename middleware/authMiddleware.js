const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin=require('../models/admin');


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
       // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
let useremail
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        useremail=user.email;
        console.log(useremail);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const check_admin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
      jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
          if (err) {
              console.log("1  This route is only allowed to Admins");
              res.redirect('/');
          }
          else {

              let role = await Admin.find({ email: useremail });
console.log("role",role);
              if (role.length >= 1) {
                  next();
              } else {
                  console.log("2   This route is only allowed to Admins");
                  res.redirect('/');
              }
          }
      });
  }
  else {
      res.redirect('/');

  }
};


module.exports = { requireAuth, checkUser,check_admin };