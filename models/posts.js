const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let commentSchema = new Schema(
   {
        author: {type: String},
        authorId:{type:String},
        content: {type: String},
        date: {type: Date}
   });
let postSchema = new Schema(
   {
        title: {type: String},
        content: {type: String},
        author: {type: String},
        authorId:{type:String},
        date: {type: Date},
        comments:[commentSchema]
   }, 
   {
       collection: 'posts'
  });

module.exports = mongoose.model('Post', postSchema);