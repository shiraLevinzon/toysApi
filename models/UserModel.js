const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    date_created:{
        type: Date,
        required: false
    },
    
    role:{
        type: String,
        enum: ['admin','user'],
        required: false,
        default: 'user'
    }

});

// Do thing to the schema before saving
userSchema.pre("save", function (next) {
    // console.log(this);
    this.id = String(this._id);
    this.date_created=Date.now();
    next();
});

const User = mongoose.model("User", userSchema);
module.exports.User=User;