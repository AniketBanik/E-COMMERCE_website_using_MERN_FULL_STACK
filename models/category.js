const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //space begining and end will be trimmed out
        required:true,
        maxlength:32
    }
  
}, 

{timestamps: true}

);


module.exports = mongoose.model("Category", categorySchema); //use user model anywhere
