import { useEffect, useState } from "react"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import Tasks from "../components/Tasks";
import AddTaskForm from "../components/AddTaskForm";

const Main = () => {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/tasks/')
                setTasks(response.data)
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getTasks()
    }, [])

    return (
        <div className="bg-gray-950">
            <div className="w-screen bg-gray-900 flex-wrap flex justify-center gap-10">
                {loading &&
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>  
                    </div>  
                }
                {error && <p>Couln't get data</p> }
                {tasks && tasks.map((task) => (
                    <Tasks key={task._id} task={task} />
                ))}
            </div>
            <AddTaskForm/>
        </div>
    )
}

export default Main