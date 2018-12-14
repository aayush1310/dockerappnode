const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: String,
//     googleId: String,
//     thumbnail: String,
//     // password: {type: String},
//     // firstname: String,
//     // lastname: String,
//     // token: String, 
// });

const alexaSchema = new Schema({
    aurl: String,
    avid: String,
    astate: String,
    
    // password: {type: String},
    // firstname: String,
    // lastname: String,
    // token: String, 
});

//const User = mongoose.model('user', userSchema);
const alexadb = mongoose.model('alexa', alexaSchema);

//module.exports = User;
module.exports = alexadb;
