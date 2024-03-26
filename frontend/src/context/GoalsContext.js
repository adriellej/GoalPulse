import { createContext, useReducer } from 'react'

// Creating a context for managing goals data
export const GoalsContext = createContext()

// Reducer function to manage state updates for goals
export const goalsReducer = (state, action) => {
    switch (action.type) {
        // Action to set goals data
        case 'SET_GOALS':
            return {
                goals: action.payload
            }
        // Action to create a new goal
        case 'CREATE_GOAL':
            return {
                goals: [action.payload, ...state.goals]
            }
        // Action to delete a goal
        case 'DELETE_GOAL':
            return {
                goals: state.goals.filter((goal) => goal._id !== action.payload._id)
            }
        // Action to update a goal
        case 'UPDATE_GOAL':
            return {
                goals: state.goals.map((goal) =>
                    goal._id === action.payload._id ? action.payload : goal
                )
            };
        // Default case returns the current state if action type is unknown
        default:
            return state
    }
}

// Context provider component to manage goals state
export const GoalsContextProvider = ({ children }) => {
    // Using useReducer hook to manage state with goalsReducer
    const [state, dispatch] = useReducer(goalsReducer, {
        goals: null
    })

    // Providing state and dispatch function to the context
    return (
        <GoalsContext.Provider value={{...state, dispatch}}>
            { children }
        </GoalsContext.Provider>
    )
}
