import React, { useState, useEffect, useContext } from 'react'

// Importing necessary icons from Heroicons library
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

// Importing GoalsContext for managing goals state
import { GoalsContext } from '../context/GoalsContext'

// Importing components for displaying goals details and goals form
import GoalsDetails from '../components/GoalsDetails'
import GoalsForm from '../components/GoalsForm'

// Home component to display goals and manage filters
const Home = () => {
    // Accessing goals state and dispatch function from context
    const { goals, dispatch } = useContext(GoalsContext)

    // State variables for managing filters
    const [completedFilter, setCompletedFilter] = useState(false)
    const [notCompletedFilter, setNotCompletedFilter] = useState(false)
    const [filteredGoals, setFilteredGoals] = useState([])

    // // Effect to fetch goals data from the server
    // useEffect(() => {
    //     const fetchGoals = async () => {
    //         try {
    //             const response = await fetch('/api/goals/')
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch goals');
    //             }

    //             const json = await response.json();
    //             // Dispatching action to set goalsin the context
    //             dispatch({type: 'SET_GOALS', payload: json})
    //         } catch (error) {
    //             console.error('Error fetching goals:', error);
    //         }
    //     }
    
    //     fetchGoals()
    // }, [dispatch])

    // // Effect to filter goals based on completedFilter and notCompletedFilter
    // useEffect(() => {
    //     let filtered = goals;
    //     if (completedFilter) {
    //         filtered = filtered.filter(goal => goal.completed === true);
    //     }
    //     if (notCompletedFilter) {
    //         filtered = filtered.filter(goal => goal.completed === false);
    //     }
    //     setFilteredGoals(filtered);
    // }, [goals, completedFilter, notCompletedFilter])

    // Effect to fetch goals data from the server and filter goals based on completedFilter and notCompletedFilter
useEffect(() => {
    const fetchGoals = async () => {
        try {
            const response = await fetch('/api/goals/')
            if (!response.ok) {
                throw new Error('Failed to fetch goals');
            }
            
            const json = await response.json();
            // Dispatching action to set goals in the context
            dispatch({type: 'SET_GOALS', payload: json})
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    }

    fetchGoals()

    // Filter goals based on completedFilter and notCompletedFilter
    let filtered = goals;
    if (completedFilter) {
        filtered = filtered.filter(goal => goal.completed === true);
    }
    if (notCompletedFilter) {
        filtered = filtered.filter(goal => goal.completed === false);
    }
    setFilteredGoals(filtered);

}, [dispatch, goals, completedFilter, notCompletedFilter])


    // Handler to toggle completed filter
    const handleCompletedFilterChange = () => {
        setCompletedFilter(!completedFilter);
    }

    // Handler to toggle not completed filter
    const handleNotCompletedFilterChange = () => {
        setNotCompletedFilter(!notCompletedFilter);
    }

    // Rendering component with goals form, filter options, and filtered goals
    return (
        <div className='home'>
            <GoalsForm />
            <div className='filter-container'>
                <div className="filter">
                    <button className="filter_icon">
                        <AdjustmentsHorizontalIcon style={{ width: "22px" }}/>
                    </button>
                    <p>Filter:</p>
                </div>

                <div className="filter-dropdown">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={completedFilter} 
                            onChange={handleCompletedFilterChange} 
                        /> Completed
                    </label>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={notCompletedFilter} 
                            onChange={handleNotCompletedFilterChange} 
                        /> Not Completed
                    </label>
                </div>
            </div>
            
            <div className='main_card_container'>
                {/* Rendering filtered goals */}
                {filteredGoals !== null && filteredGoals.map(goal => (
                    <GoalsDetails key={goal._id} goal={goal} />
                ))}
            </div>
        </div>
    )
}

export default Home
