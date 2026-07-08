import React, { useEffect, useState } from 'react';

function IssueList() {
    const [issues, setIssues] = useState([]);

    const showDueDate = (dueDate) => {
        return dueDate === true || dueDate === 'true' ? '' : dueDate;
    };

    const fetchIssues = async() =>{
        try{
            const res = await fetch('http://localhost:5000/api/issues');
            const data = await res.json();
            setIssues(data);
        }catch(error){
            alert("Error fetching the issue");
            console.log(error);
        }
    }

    const updateIssueStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/issues/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ issueStatus: newStatus })
            });
            if (!response.ok) {
                throw new Error(`Failed to update: ${response.statusText}`);
            }
            fetchIssues();
        } catch(error) {
            alert("Error updating issue status");
            console.log(error);
        }
    };

    const deleteIssue = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/issues/${id}`, { method: 'DELETE' });
            fetchIssues();
        } catch(error) {
            alert("Error deleting the issue");
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchIssues();
        
        // Setup event listener to refresh when an issue is created
        const handleIssueCreated = () => {
            fetchIssues();
        };
        window.addEventListener("issueCreated", handleIssueCreated);
        
        return () => {
            window.removeEventListener("issueCreated", handleIssueCreated);
        };
    },[]);

    return(
        <div className="issue-list">
            <h2>Issues</h2>

            {issues.length === 0 && <p>No issues found.</p>}

            {issues.filter(issue => issue.issueStatus !== 'Solved' && issue.issueStatus !== 'solved').map((issue)=>(
                <div key={issue._id} className="issue-card">
                    <h3>Title: {issue.title || 'Untitled issue'}</h3>
                    <p><strong>Description:</strong> {issue.description || 'No description'}</p>

                    <p><strong>Due Date:</strong> {showDueDate(issue.dueDate)}</p>
                    <p><strong>Owner:</strong> {issue.owner === true || issue.owner === 'true' ? 'Unassigned' : issue.owner || 'Unassigned'}</p>
                    <p><strong>Priority:</strong> {issue.priority || 'No priority'}</p>
                    <p>
                        <strong>Issue Status:</strong> 
                        <select 
                            value={issue.issueStatus || 'new'} 
                            onChange={(e) => updateIssueStatus(issue._id, e.target.value)}
                            style={{ marginLeft: '10px' }}
                        >
                            <option value="new">New</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Solved">Solved</option>
                        </select>
                    </p>
                    <p><strong>Created At:</strong> {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : 'Unknown'}</p>

                    <button className="delete-button" onClick={()=> deleteIssue(issue._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default IssueList;