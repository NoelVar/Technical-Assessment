import { useEffect, useState } from "react"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import Tasks from "../components/Tasks";
import AddTaskForm from "../components/AddTaskForm";
import Card from 'react-bootstrap/Card';
import Footer from "../components/Footer";

const Main = () => {

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://task-management-kwre.onrender.com/api/tasks/')
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

    const todoTasks = tasks?.filter(task => task.status === 'To Do') || [];
    const inProgressTasks = tasks?.filter(task => task.status === 'In Progress') || [];
    const doneTasks = tasks?.filter(task => task.status === 'Done') || [];

    const taskBox = "grid gap-6 bg-gray-900 text-white border-2 border-solid p-4 rounded-lg h-200 overflow-scroll no-scrollbar"
    const cardStyle = "!bg-gray-800 text-white"

    return (
        <div>
            <div className="bg-gray-950 p-10">
                <div className="w-fill flex-wrap flex justify-center gap-10 rounded-lg">
                    {loading &&
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>  
                        </div>  
                    }
                    {error && <p className="text-white">Couln't get data</p> }
                    {todoTasks && !error &&
                        <div className={ taskBox }>
                            <h2 className="text-center">To Do</h2>
                            {todoTasks.map((task) => (
                                <Card className={cardStyle} style={{ width: '18rem' }} key={task._id}>
                                    <Tasks key={task._id} task={task} />
                                </Card>
                            ))}
                        </div>
                    }

                    {inProgressTasks && !error &&
                        <div className={ taskBox }>
                            <h2 className="text-center">In Progress</h2>
                            {inProgressTasks.map((task) => (
                                <Card className={cardStyle} style={{ width: '18rem' }} key={task._id}>
                                    <Tasks key={task._id} task={task} />
                                </Card>
                            ))}
                        </div>
                    }
                    {doneTasks && !error &&
                        <div className={ taskBox }>
                            <h2 className="text-center">Done</h2>
                            {doneTasks.map((task) => (
                                <Card className={cardStyle} style={{ width: '18rem' }} key={task._id}>
                                    <Tasks key={task._id} task={task} />
                                </Card>
                            ))}
                        </div>
                    }
                </div>
                <AddTaskForm/>
            </div>
            <Footer />
        </div>
    )
}

export default Main