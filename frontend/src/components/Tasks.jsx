import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardBody from 'react-bootstrap/esm/CardBody';
import CardText from 'react-bootstrap/esm/CardText';
// import CardText from 'react-bootstrap/esm/CardText';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import axios from 'axios';

const Tasks = ({ task }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [dueDate, setDueDate] = useState('')

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        setId(task._id)
    }

    const toggleMoreInfo = () => {
        setShowMore(!showMore)
    }

    const handlePriority = async (e) => {
        setPriority(e.target.value)
    }

    const handleStatus = async (e) => {
        setStatus(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.patch(
                'http://localhost:4000/api/tasks/update', 
                {
                    id,
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

        } catch (error) {
            const message = error.response?.data?.error || "An unknown error has occoured"
            console.log(message)
        }
    }

    const labelStyle = "text-xs font-bold text-gray-500"
    const inputStyle = "w-full border p-1 rounded text-black text-sm placeholder:text-gray-400 bg-white"

    if (isEditing) {
    return (
        <CardBody>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className={ labelStyle }>Edit Title</label>
                    <input 
                        type="text"  
                        defaultValue={task.title}
                        className={ inputStyle }
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter new title...'
                    />
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter the description of the task..."
                        defaultValue={task.description}
                        rows={3}
                        className={inputStyle}
                    />
                </div>

                <div>
                    <label className={ labelStyle }>Edit Priority</label>
                    <select 
                        className={ inputStyle }
                        defaultValue={task.priority}
                        onChange={handlePriority} 
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Edit status</label>
                    <select 
                        className={inputStyle}
                        defaultValue={task.status}
                        onChange={handleStatus}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className={labelStyle}>Task due date ({ new Date(task.due).toDateString() || 'Not provided'})</label>
                    <input 
                        type="date"
                        className={inputStyle}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <Button type="submit" variant="success" size="sm">
                        Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={toggleEditMode}>
                        Cancel
                    </Button>
                </div>
            </form>
        </CardBody>
        )
    }
    return (
        <>
        <CardBody>
            {!showMore ? (
                <>
                    <CardTitle>{task.title}</CardTitle>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Due:</strong> {new Date(task.due).toDateString() || 'No due date'}</p>
                    {/* <p><strong>Assignees:</strong> {task.assignees}</p> */}
                    
                    <div className="flex gap-2 pt-2">
                        <Button variant="primary" size="sm" onClick={toggleEditMode}>
                            Update
                        </Button>
                        <Button variant="secondary" size="sm" onClick={toggleMoreInfo}>
                            More
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <CardTitle>{task.title}</CardTitle>
                    <CardText>{task.description}</CardText>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Due:</strong> {new Date(task.due).toDateString() || 'No due date'}</p>
                    {/* <p><strong>Assignees:</strong> {task.assignees}</p> */}
                    
                    <Button variant="danger" size="sm" onClick={toggleMoreInfo}>
                        Close
                    </Button>
                </>
            )}
        </CardBody>
      </>
    )
}

export default Tasks