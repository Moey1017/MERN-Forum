const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
   {
        name:{type:String},
        email: {type: String},
        password: {type: String},
        accessLevel:{type:Number},
        lastLoggedIn:{type: Date},
        createdDate:{type: Date}
   }, 
   {
       collection: 'users'  // whr does this link to 
  });

module.exports = mongoose.model('User', userSchema);