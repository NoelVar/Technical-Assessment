import { useState } from "react"
import axios from 'axios'
import Button from "react-bootstrap/esm/Button"

const AddTaskForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errmsg, setErrorMessgae] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [dueDate, setDueDate] = useState('')

    const handlePriority = async (e) => {
        setPriority(e.target.value)
    }

    const handleStatus = async (e) => {
        setStatus(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                'http://localhost:4000/api/tasks/create', 
                {
                    title,
                    description,
                    priority,
                    status,
                    due: dueDate
                }
            )
            console.log(response)
            setTitle('')
            setDescription('')
            setPriority('')
            setStatus('')
            setDueDate('')

            setTimeout(function() {
                window.location.reload();
            }, 1000);

        } catch (error) {
            const message = error.response?.data?.error || "An unknown error has occoured"
            setErrorMessgae(message)
        }
        
    }

    const inputStyle = "block w-full rounded-md border border-gray-300 bg-white py-1.5 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
    const labelStyle = "text-sm font-medium text-gray-300"

    return (
        <div className="m-15 p-6 bg-gray-900 text-white rounded-lg border-2 border-solid">
            <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="border-b border-gray-700 pb-2">Add a New Task</h3>
                
                <div className="space-y-1">
                    <label className={labelStyle}>Task title</label>
                    <input
                        type="text"
                        placeholder="Enter the title of the task..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        className={inputStyle}
                    />
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description of the task..."
                        value={description}
                        required
                        rows={3}
                        className={inputStyle}
                    />
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task priority</label>
                    <select 
                        onChange={handlePriority} 
                        value={priority}
                        required 
                        className={inputStyle}
                    >
                        <option value="" disabled>Select a priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task status</label>
                    <select 
                        onChange={handleStatus} 
                        value={status} 
                        className={inputStyle}
                        required
                    >
                        <option value="" disabled>Select a status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task due date</label>
                    <input 
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        className={inputStyle}
                    />
                </div>
                
                <Button className="w-full mt-3 justify-center" type="submit">
                    Submit
                </Button>
            </form>

            {errmsg && (
                <p className="mt-4 p-3 rounded bg-red-900/50 border border-red-500 text-red-200 text-sm font-medium">
                    {errmsg}
                </p>
            )}
        </div>
    )
}

export default AddTaskForm