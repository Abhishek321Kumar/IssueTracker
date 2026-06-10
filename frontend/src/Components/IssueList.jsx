
import React, {useState,useEffect} from "react";
import axios from 'axios';

function IssueList() {
  const[issues,setIssues] = useState([]);

    const fetchIssues = async() =>{
        try{
            const res = await axios.get('http://localhost:5000/api/issues');
            setIssues(res.data);

        }catch(error){
            alert("Error fetching the issue");
            console.log(error);
        }
    };

    const deleteIssue = async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/issues/${id}`);
            setIssues(prevIssues => prevIssues.filter(issue => issue._id !== id));
        }catch(error){
            alert("Error in deleting Ticket");
            console.log(error);
        }
    };



    useEffect(()=>{
        fetchIssues();
        // window.dispatchEvent(new Event("ticketCreated"))
    },[]);

    return(
        <div className= "issue-list">
            <h2>Issues</h2>
            {issues.length === 0 && <p>No Tickets found</p>}
            {issues.map((issue)=>(
            <div key ={issue._id} className="issue-card">
             <h3>{issue.title}</h3>
             <p><strong>Description: </strong> {issue.description}</p>
             <p>Due at:{new Date(issue.due).toLocaleString()}</p>
            <p><strong>Owner: </strong> {issue.owner}</p>
            <p><strong>Priority: </strong> {issue.priority}</p>
             <div className="issue-button">
             <button onClick = {()=> deleteIssue(issue._id)}>Delete</button>
             </div>   
             </div>
            ))}
        </div>
    )
}



export default IssueList;


