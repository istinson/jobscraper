const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
	id: String,
	title: String,
	completed: Boolean,
	link: String
});

const Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;