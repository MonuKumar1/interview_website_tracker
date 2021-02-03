const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({ 
    Name:{
    type : String,
},
Image:{
    type : String,
},
Company:{
    type : String,
},
Experience:{
    type : String,
},
Link:{
    type : String,
},
});

const Company = mongoose.model('company', CompanySchema);
// let topic=Company.find({});

module.exports = Company;