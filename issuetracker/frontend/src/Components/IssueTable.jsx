import React, { useState } from "react";

function IssueTable() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        dueDate: "",
        owner: "",
        priority: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Sending Data:", form);

        try {
            const response = await fetch("http://localhost:5000/api/issues", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.err || 'Failed to create issue');
            }

            const data = await response.json();

            console.log("Saved:", data);

            alert("Issue created successfully.");

            window.dispatchEvent(new Event("issueCreated"));

            setForm({
                title: "",
                description: "",
                dueDate: "",
                owner: "",
                priority: ""
            });

        } catch (error) {
            console.error("Fetch Error:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Create Issue</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Owner</label>
                    <input
                        type="text"
                        name="owner"
                        value={form.owner}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">
                    <label>Priority</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>

            </form>
        </div>
    );
}

export default IssueTable;