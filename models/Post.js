const mongoose = require('mongoose');

//creating  schema for the post

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500,

    },
    img :{
        type:String
    },
    likes:{
        type:Array,
        default: []
    }


}, { timestamps: true });

//exporting post model 

module.exports = mongoose.model("Post", PostSchema);