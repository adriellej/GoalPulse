const express = require('express')

const router = express.Router()

const { 
	createGoal,
    getGoal,
    getGoals,
    deleteGoal,
    updateGoal 
} = require('../controllers/goalControllers')

// GET all workouts
router.get('/', getGoals)

// GET a single workout
router.get('/:id', getGoal)

// POST a new workout
router.post('/', createGoal)

// DELETE a workout
router.delete('/:id', deleteGoal)

// UPDATE a workout
router.patch('/:id', updateGoal)


module.exports = router