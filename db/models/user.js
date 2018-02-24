const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
	google: {
		googleId: { type: String, required: false }
	},
	dogName: { type: String, unique: false },
	saidYes: { type: Array },
	saidNo: { type: Array },
	matches: { type: Array },
	owner: { type: String, unique: false },
	sex: { type: String, unique: false },
	fixed: { type: String, unique: false },
	location: { type: String, unique: false },
	photo: { type: String, unique: false, required: false },
	radius: {type: String, unique: false },
	vetDate: { type: String, unique: false },
	places: {type: Array, unique: false },
	playdates: { type: Array }

	// {username: this.state.user, dogName: this.state.dogName, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed, location: this.state.location}

	// local: {
	// 	email: { type: String, unique: true },
	// 	password: { type: String }
	// },
	// google: {
	// 	id: { type: String },
	// 	photos: []
	// },
	// firstName: { type: String },
	// lastName: { type: String }
})

// Define schema methods
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.local.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function(next) {
	if (!this.local.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.local.password = this.hashPassword(this.local.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// Create reference to User & export
const User = mongoose.model('User', userSchema)
module.exports = User
