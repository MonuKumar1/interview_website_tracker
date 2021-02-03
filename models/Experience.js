const mongoose = require('mongoose');
const Program= require('./Program');

const questionSchema = new mongoose.Schema({
    QuestionName:{
        type : String,
    },
  LinkTo:{
    type: String,
},
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'program' },


   approv : {
     type:Boolean,
    default:false,
    


   },
  }



   );


const Question = mongoose.model('question', questionSchema);
let question=Question.find({});
module.exports = Question;