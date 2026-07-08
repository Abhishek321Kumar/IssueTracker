const express = require('express');
const Issue = require('../models/Issues');

const router = express.Router();

// Create Issue
router.post('/', async (req, res) => {
    try {
        const issue = new Issue({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            owner: req.body.owner,
            priority: req.body.priority,
            issueStatus: req.body.issueStatus
        });

        await issue.save();

        res.status(201).json(issue);

    } catch (err) {
        console.error("Error Saving Issue:", err);
        res.status(400).json({ err: err.message });
    }
});

// Get all issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

// Update issue
router.put('/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedIssue) {
            return res.status(404).json({ err: "Issue not found" });
        }
        res.json(updatedIssue);
    } catch (err) {
        console.error(err);
        res.status(400).json({ err: err.message });
    }
});

// Delete issue
router.delete('/:id', async (req, res) => {
    try {
        const deletedIssue = await Issue.findByIdAndDelete(req.params.id);

        if (!deletedIssue) {
            return res.status(404).json({ err: "Issue not found" });
        }

        res.json({ message: "Issue deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(400).json({ err: err.message });
    }
});

module.exports = router;