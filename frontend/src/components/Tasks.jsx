import Button from 'react-bootstrap/Button';

const Tasks = ({ task }) => {
    return (
        <div className='m-5 bg-white'>
            <p>{task.title}</p>
            <Button variant="primary">Primary</Button>
            <p>{task.status}</p>
            <p>{task.priority}</p>
            <p>{task.due}</p>
            <p>{task.assignees}</p>
        </div>
    )
}

export default Tasks