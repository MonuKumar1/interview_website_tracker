const mongoose = require('mongoose');


const programSchema = new mongoose.Schema({topic:'string'});

const Program = mongoose.model('program', programSchema);
let topic=Program.find({});

module.exports = Program;