
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser,check_admin } = require('./middleware/authMiddleware');
const Program=require("./models/Program");
const Question=require("./models/Question");
const Company=require("./models/Company");
const admin=require("./models/admin");

/////

const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')

AdminBro.registerAdapter(AdminBroMongoose)

const User=require('./models/User','./models/Program');
//const User = mongoose.model('User', {  name: String,email: String, surname: String })
const AdminBroOptions = {
  resources: [User,Program,Question,Company,admin],

}

const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)

const app = express();



//const AdminBro = new AdminBro(AdminBroOptions)
//const router = AdminBroExpress.buildRouter(adminBro)
/////////////////////////////////////////////////////////////////
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://****:*********6@cluster0.kfzi2.mongodb.net/website?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000);
    console.log("connected to server");
    app.use('/admin',requireAuth,check_admin,router);}
    )

  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
//app.get('/topic', requireAuth, (req, res) => res.render('topic'));
//app.get('/topic',requireAuth, (req, res) => res.render('topic'));
app.use(authRoutes);
