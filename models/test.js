///////model\\\//////////////\\\\\\\////\\\\////////\\\\\\\/////\/\/\/\/\/\/\/\/
const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: 'string' });
const Tank = mongoose.model('Tank', schema);
//const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!s
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

});
const Program = mongoose.model('program', schema);

module.exports= Program;
/////////////////////////////////////////////////////////////////