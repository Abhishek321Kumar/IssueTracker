
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, default:''},
    dueDate:{type:String, default:true},
    owner:{type:String, default:true},
    priority:{type:String, default:'low'},
    createdAt: {type: Date, default: Date.now }
})

module.exports = mongoose.model('Issues',IssueSchema);
