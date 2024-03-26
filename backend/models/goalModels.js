const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		completed: {
			type: Boolean,
			required: true,
            default: false
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Goal', goalSchema)