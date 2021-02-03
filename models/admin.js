const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({ 
    email:{
    type : String,
},}
);

const Admin = mongoose.model('admin', adminSchema);
// let topic=Company.find({});

module.exports = Admin;