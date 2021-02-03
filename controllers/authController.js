const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Program =require('../models/Program');
const Question =require('../models/Question');
const Company2=require('../models/Company');
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports.topic_get = async(req, res)=>
{
  let topic=await Program.find({});
  res.locals.topic =topic;
  res.render('topic');

}

const quesFun = async (topics)=>{
  let topicID = await Program.findOne({topic:topics});
 // console.log(4,topicID) ;
  let question1 = await Question.find({topic:topicID._id,approv:true});
  
 // console.log(2,question1);
  return question1;
}

let question;
let topiC;
module.exports.topic_post = (req,res) =>{
    const {topic} = req.body;
    topiC = topic;
   // console.log(1,topiC);
   res.redirect('/question')
}



module.exports.question_get = async(req, res)=>
{       let topic=await Program.find({});
         res.locals.topic =topic;
  //let question=await Question.find({});
  const ques = quesFun(topiC);
    ques.then((data) => {
        question = data;
       // console.log(3,question);
        res.render('question', {topiC, question});
    })
  // res.locals.question =question;
  // res.render('question');
}


module.exports.added_post=async(req,res)=>
{
  const {topic,QuestionName,ques}=req.body;
  let addQ_topicData = await Program.find({ topic });
    //const name = addQ_title; 
    const topic2 = addQ_topicData[0]._id;

  console.log(topic2,QuestionName,ques);
  let addme=new Question({QuestionName,topic:topic2,LinkTo:ques});
  addme.save()
  .then( ()=>{
    console.log("saved");
  })
}




// module.exports.company_get = (req, res)=>{
//   const abc = cmpFun();
//   abc.then((data)=>{
//       items = data;
//       res.render('experience', { items });
//   })
  
   
// }
module.exports.thanku_post=async(req,res)=>
{
  const {Name,Image,Company,Link,Experience}=req.body;

  let thankme=new Company2({Name,Image,Company,Link,Experience});
  thankme.save()
  .then( ()=>{
    console.log("saved");
  })
}

// const cmpFun = async()=>{
//   let data = await Company2.find({ });
//   return data;
// }

let name_
module.exports.company_post = (req, res)=>{
    const{c_name} = req.body;
    name_= c_name;
   
}
 const cmpFun = async(n)=>{
  let data = await Company2.find({ Company: n});
  return data;
}

module.exports.company_get = (req, res)=>{
  const abc = cmpFun(name_);
  abc.then((data)=>{
      items = data;
      res.render('experience', { items });
  })


}