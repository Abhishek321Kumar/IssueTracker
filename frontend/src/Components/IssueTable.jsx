
import React, {useState} from "react";
import axios from 'axios'

function IssueTable() {
 const [form,setForm] = useState({
title:'',
description:'',
due:'',
owner:'',
priority:''
 })
const handleChange=(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value })
}


const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        await axios.post('http://localhost:5000/api/issues', form);
        alert('Issue created');
        setForm ({title:'',
        description:'',
        due:'',
        owner:'',
        priority:''
        });


    } catch(error){
        alert("Error Creating Issue ");
        console.log(console.error());
    };
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" value={form.title} onChange={handleChange}/> <br/><br/>

        <label htmlFor="description" >Description: </label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} ></textarea> <br/><br/>

         <label htmlFor="due">Due: </label>
        <input type="text" id="due"  name="due" value={form.due} onChange={handleChange}/>
        <br/> <br/>

       <label htmlFor="owner">Owner: </label>
        <input type="text" id="owner"  name="owner" value={form.owner} onChange={handleChange}/>
        <br/> <br/>

        <label htmlFor="priority">Priority: </label>
        <select id="priority" name="priority" value={form.priority} onChange={handleChange} >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
 
        <br/><br/>

       

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}


export default IssueTable;

