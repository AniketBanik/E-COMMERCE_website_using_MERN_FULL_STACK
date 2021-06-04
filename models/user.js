const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //space begining and end will be trimmed out
        required:true,
        maxlength:32
    },
    email: {
        type: String,
        trim: true, //space begining and end will be trimmed out
        required:true,
        unique:32
    },
    hashed_password: {
        type: String,
        required:true,
        
    },
    about: {
        type: String,
        trim: true, //space begining and end will be trimmed out
        
    },

    salt : String,
    role: {
        type: Number, 
        default:0  //0 for use,1 for admin
    },
    history:{
        type:Array,
        default: []

    }
}, 
{timestamps: true}
);