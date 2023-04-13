const mongoose = require("../database");
 
// create an schema
var userSchema = new mongoose.Schema({
            Department: String,
            Paper_title:String
        });
 
var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("Users", userModel);