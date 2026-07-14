import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardBody from 'react-bootstrap/esm/CardBody';
import CardText from 'react-bootstrap/esm/CardText';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import axios from 'axios';

const Tasks = ({ task }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [isAssigning, setIsAssigning] = useState(false)

    const [id, setId] = useState(task._id || '')
    const [title, setTitle] = useState(task.title || '')
    const [description, setDescription] = useState(task.description || '')
    const [priority, setPriority] = useState(task.priority || '')
    const [status, setStatus] = useState(task.status || 'To Do')
    const [dueDate, setDueDate] = useState(task.due || '')
    const [assignees, setAssignees] = useState(task.assignees || [])

    const [allAssignees, setAllAssignees] = useState([])
    const [assingeeDetails, setAssigneeDetails] = useState('')
    const [added, setAdded] = useState(false)

    const [error, setError] = useState(false)

    useEffect(() => {
        const getAssignees = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/assignees/')
                setAllAssignees(response.data)
            } catch (err) {
                console.error(err)
                setError(true)
            }
        }

        getAssignees()
    }, [])

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        setId(task._id)
    }

    const toggleMoreInfo = () => {
        setShowMore(!showMore)
    }

    const toggleAssign = () => {
        setIsAssigning(!isAssigning)
    }

    const handleAssigneeDetails = async (e) => {
        const selectedAssignee = allAssignees.find(p => p._id === e.target.value)
        setAssigneeDetails(selectedAssignee)
    }

    const handleAssignees = async () => {
        const assignee = assingeeDetails._id
        setAssignees([...assignees, assignee])
        setAdded(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.patch(
                'http://localhost:4000/api/tasks/update', 
                {
                    id,
                    title,
                    description,
                    priority,
                    status,
                    due: dueDate,
                    assignees
                }
            )
            
            setTitle('')
            setDescription('')
            setPriority('')
            setStatus('')
            setDueDate('')
            setIsEditing(false)
            setIsAssigning(false)

            setTimeout(function() {
                window.location.reload();
            }, 1000);

        } catch (error) {
            const message = error.response?.data?.error || "An unknown error has occoured"
            console.log(message)
        }
    }

    const labelStyle = "text-xs font-bold text-gray-500"
    const inputStyle = "w-full border p-1 rounded text-black text-sm placeholder:text-gray-400 bg-white"

    if (isEditing || isAssigning) {
    return (
        <CardBody>
        {!isAssigning 
        ? (
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className={ labelStyle }>Edit Title</label>
                    <input 
                        type="text"  
                        defaultValue={title}
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
                        defaultValue={description}
                        rows={3}
                        className={inputStyle}
                    />
                </div>

                <div>
                    <label className={ labelStyle }>Edit Priority</label>
                    <select 
                        className={ inputStyle }
                        defaultValue={priority}
                        onChange={(e) => setPriority(e.target.value)} 
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
                        defaultValue={status}
                        onChange={(e) => setStatus(e.target.value)}
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
        )
        :
        (
        <>
            {!error ? (
            <form onSubmit={handleSubmit} className="space-y-3">
                
                <div className="space-y-1">
                    <label className={labelStyle}>Add assignees</label>
                    <select 
                        className={inputStyle}
                        defaultValue={task.assignees}
                        onChange={handleAssigneeDetails}
                    >
                        {allAssignees && allAssignees.map((singleAssignee) => 
                            <option 
                                value={singleAssignee._id} 
                                key={singleAssignee._id}
                            >{singleAssignee.name}</option>
                        )}
                    </select>

                    {assingeeDetails &&
                        <CardText>Local time: {
                            assingeeDetails.timezone ? new Intl.DateTimeFormat('en-GB', {
                                timeZone: assingeeDetails.timezone,
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour12: true,
                                hour: 'numeric',
                                minute: 'numeric'
                            }).format(new Date()) : 'No timezone information found'
                        }</CardText>
                    }

                </div>

                <div className="flex gap-2 pt-2">
                    <Button type='submit' variant="success" size="sm" disabled={!added ? true : false}>
                        Save
                    </Button>
                    <Button onClick={handleAssignees} variant="primary" size="sm">
                        Add Person
                    </Button>
                    <Button variant="secondary" size="sm" onClick={toggleAssign}>
                        Cancel
                    </Button>
                </div>
            </form>
            ) : (
            <>
                <CardTitle>An error has occoured. Please try again later.</CardTitle>
                <Button variant="secondary" size="sm" onClick={toggleAssign}>
                    Cancel
                </Button>
            </>
            )}
        </>
        )}
        </CardBody>
        )
    } 

    return (
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
                        <Button variant="primary" size="sm" onClick={toggleAssign}>
                            Assign
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
                    <div><strong>Assignees: </strong>
                        {allAssignees &&
                            allAssignees
                            .filter(person => task.assignees?.includes(person._id))
                            .map(person => (
                                    <div key={person._id} className='grid w-fill bg-white/10 text-sm my-3 p-2 rounded-lg border-2 border-gray-300'>
                                        <span className='font-bold'>{person.name} - {person.location}</span>
                                        <span className='italic'>{person.email}</span>
                                        <span>
                                            {
                                                person.timezone ? new Intl.DateTimeFormat('en-GB', {
                                                    timeZone: person.timezone,
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour12: true,
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                }).format(new Date()) : 'No timezone information found'
                                            }
                                        </span>
                                    </div>
                                ))
                        }
                    </div>
                    
                    <Button variant="danger" size="sm" onClick={toggleMoreInfo}>
                        Close
                    </Button>
                </>
            )}
        </CardBody>
    )
}

export default Tasks