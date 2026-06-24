const express = require('express')
const Issue = require('../models/Issues')
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
   const issue = new Issue(req.body);
   await issue.save();
   res.status(201).json(issue);
    }
    
    catch(err)
{
res.status(400).json({err:err.message}) 

}});


router.get('/', async(req,res)=>{
try{
const issues = await Issue.find();
 res.json(issues);
}
catch(err){
 res.status(500).json({ err: err.message });
}
});


router.put('/:id', async(req,res)=>{
try{
const updateIssue = await Issue.findByIdAndUpdate(
 req.params.id,
 req.body,  
{ new: true, runValidators: true }
);

if(!updateIssue){
    return res.status(404).json({ err: 'Issue not found' });
}

res.json(updateIssue);
}
catch(err){
res.status(400).json({ err: err.message });
}
});

router.delete('/:id',async(req,res)=>{
try{
const deleteIssue = await Issue.findByIdAndDelete(req.params.id);

if(!deleteIssue){
    return res.status(404).json({err:'Issue not found'});
}

res.json({message: 'Issue deleted successully'})
}
catch(err){
    res.status(400).json({err:err.message})
}
});

module.exports=router;