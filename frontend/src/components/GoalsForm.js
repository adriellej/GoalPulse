import { useState, useContext } from 'react'

// Importing GoalsContext to access dispatch function
import { GoalsContext } from '../context/GoalsContext'

// Component for creating new goals
const GoalsForm = () => {
    // Accessing dispatch function from GoalsContext
    const { dispatch } = useContext(GoalsContext)

    // State variables for title, description, and error handling
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Creating a goal object from form data
        const goal = {
            title, 
            description
        }

        // Sending POST request to create a new goal
        const response = await fetch('/api/goals/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(goal),
        })

        // Parsing response JSON
        const json = await response.json()

        // Handling errors
        if (!response.ok) {
            setError(json.error)
        }

        // If successful, reset form fields, clear error, and dispatch action to create goal
        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            
            dispatch({type: 'CREATE_GOAL', payload: json})
        }
    }

    // Rendering form for creating new goals
    return (
        <div className="form_container">
            <form className="form" onSubmit={handleSubmit}>

                <label>Title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label>Description:</label>
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <button type="submit" className="add_btn">+</button>
                {error && <div className='error'> {error}</div>}
            </form>
        </div>
        
    )

}

export default GoalsForm
