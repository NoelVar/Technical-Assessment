import { useEffect, useState } from "react"
import axios from 'axios'

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
        <div className="mt-20">
            <div className="w-screen bg-red-50 flex-wrap flex justify-center gap-10">
                {loading && <p>Loading...</p>}
                {tasks && tasks.map((task) => (
                    <p key={task._id} className="bg-white w-md rounded-lg shadow p-4">{task.title}</p>
                ))} 
                {error &&
                    <p>Couln't get data</p>
                }
            </div>
        </div>
    )
}

export default Main