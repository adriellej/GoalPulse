import { useState, useContext } from 'react';

// Importing GoalsContext for managing goals state
import { GoalsContext } from '../context/GoalsContext';

// Importing PencilSquareIcon from Heroicons library
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// Component for displaying details of a goal and providing editing functionality
const GoalsDetails = ({ goal }) => {
    // Accessing dispatch function from GoalsContext
    const { dispatch } = useContext(GoalsContext);

    // State variables for managing editing state and edited goal
    const [isEditing, setIsEditing] = useState(false);
    const [editedGoal, setEditedGoal] = useState(goal);

    // State variable for managing completed status
    const [completed, setCompleted] = useState(false);

    // Function to format date string into a readable format
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    // Function to handle deletion of a goal
    const handleDelete = async () => {
        try {
            const response = await fetch('/api/goals/' + goal._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_GOAL', payload: json });
            } else {
                console.error('Failed to delete goal:', json);
            }
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    }

    // Function to handle initiating editing of a goal
    const handleEdit = () => {
        setIsEditing(true);
    }

    // Function to handle saving changes to a goal
    const handleSave = async () => {
        try {
            const response = await fetch('/api/goals/' + goal._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedGoal)
            });

            const updatedGoal = await response.json();

            if (response.ok) {
                dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
                setIsEditing(false);
            } else {
                console.error('Failed to update goal:', updatedGoal);
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    }

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedGoal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle toggling of completed status
    const handleCheckboxChange = async () => {
        const updatedGoal = { ...editedGoal, completed: !editedGoal.completed };
        setEditedGoal(updatedGoal);

        try {
            const response = await fetch('/api/goals/' + goal._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: updatedGoal.completed })
            });

            const updatedGoalFromServer = await response.json();

            if (response.ok) {
                dispatch({ type: 'UPDATE_GOAL', payload: updatedGoalFromServer });
            } else {
                console.error('Failed to update goal:', updatedGoalFromServer);
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    // Rendering component with goal details and editing options
    return (
        <div className="card_container">
            {/* Button to delete a goal */}
            <button onClick={handleDelete} className="delete_btn card_btn">x</button>

            <div className="card">
                <div className="card_details">
                    {/* Displaying editing fields if editing mode is enabled */}
                    {isEditing ? (
                        <div className="edit_container">
                            <input
                                type="text"
                                name="title"
                                value={editedGoal.title}
                                onChange={handleChange}
                            />
                            <textarea
                                name="description"
                                value={editedGoal.description}
                                onChange={handleChange}
                                className="edit_description"
                            ></textarea>
                            <button onClick={handleSave} className='saveButton'>Save</button>
                        </div>
                    ) : (
                        <>
                            {/* Displaying goal details */}
                            <div className="card_title">
                                <input
                                    type="checkbox"
                                    checked={editedGoal.completed}
                                    onChange={handleCheckboxChange}
                                    value={completed}
                                    className="checkbox_style"
                                />
                                <h4>
                                    {goal.title}
                                </h4>
                            </div>
                            <p><span className="card_content_title">Description:</span> {goal.description}</p>
                            <p><span className="card_content_title">Completed:</span> {goal.completed ? 'Yes' : 'No'}</p>
                            <p><span className="card_content_title">Created:</span> {formatDate(goal.createdAt)}</p>
                            {/* Button to enable editing */}
                            <div className="icon-container">
                                <button onClick={handleEdit} className="edit_btn">
                                    <PencilSquareIcon />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GoalsDetails;
