
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, default:''},
    dueDate:{type:String, default:''},
    owner:{type:String, default:''},
    priority:{type:String, default:''},
    issueStatus:{type:String, default:'new'},
    createdAt: {type: Date, default: Date.now }
})

module.exports = mongoose.model('Issues',IssueSchema);
