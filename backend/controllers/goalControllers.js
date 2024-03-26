const Goal = require('../models/goalModels')
const mongoose = require('mongoose')

// get all workouts
const getGoals = async (req, res) => {
	const goals = await Goal.find({}).sort({createdAt: -1})

	res.status(200).json(goals)
}

// get a single workout
const getGoal = async (req, res) => {
	const { id } = req.params

	if(!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'No such goal'})
	}

	const goal = await Goal.findById(id)

	if (!goal) {
		return res.status(404).json({error: 'No such goal'})
	}

	res.status(200).json(goal)
}


// create new workout
const createGoal = async (req, res) => {
	
	// add doc to db
	try {
		const { title, description, completed } = req.body

		const goal = await Goal.create({ 
			title,
			description,
			completed
		})
		
		res.status(200).json(goal)
	}
	catch (error) {
		res.status(400).json({error: error.message})
	}
}

// delete a workout
const deleteGoal = async (req, res) => {
	const { id } = req.params 

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'No such goal'})
	}

	const goal = await Goal.findOneAndDelete({ _id: id })
	
	if (!goal) {
		return res.status(404).json({error: 'No such goal'})
	}

	res.status(200).json(goal)
}

// update a workout
const updateGoal = async (req, res) => {
	const { id } = req.params 

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'No such goal'})
	}

	const goal = await Goal.findOneAndUpdate(
		{ _id: id }, 
		{ ...req.body },
		{ new: true} 
	)
	
	if (!goal) {
		return res.status(404).json({error: 'No such goal'})
	}

	res.status(200).json(goal)
}


module.exports = { 
	createGoal,
    getGoal,
    getGoals,
    deleteGoal,
    updateGoal
}