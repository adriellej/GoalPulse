require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const goalRoutes = require('./routes/goalRoutes')

// express app
const app = express()


// middleware
app.use(express.json())

// routes
app.use('/api/goals/', goalRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
			console.log(`Server is connected to db and is running on port`, process.env.PORT)
		})

	})
	.catch((error) => {
		console.log(error)
	})
