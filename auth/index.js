const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
)

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	const { username, password, dogName } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password,
			'dogName': dogName
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})
// {username: this.state.user, dogName: this.state.dogName, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed, location: this.state.location}
router.put('/signup', (req, res) => {
	const { username, thisUser, thatUser, saidYes, saidNo, dogName, owner, sex, fixed, location, matched } = req.body;
	if (saidNo){
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'saidNo': saidNo } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	} else {
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'saidYes': saidYes } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	}

	if (matched){
		User.update({ 'local.username': thisUser },{ $push: { 'matched': thatUser } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
		User.update({ 'local.username': thatUser },{ $push: { 'matched': thisUser } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	}

	if (dogName){
		User.findOneAndUpdate({ 'local.username': username },{ 'dogName': dogName, 'owner': owner, 'sex': sex, 'fixed': fixed, 'location': location   }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	}
})



router.get('/signup', function(req, res) {
	// Grab every document in the Articles collection
	const { thatUser } = req.body;
	if (thatUser){
		User.findOne({ 'local.username': thatUser })
		.then(data => res.send(data))
		.catch(err => console.log(err))
	} else {
	
	User.find({})
	  .then(function(dbUser) {
		// If we were able to successfully find Articles, send them back to the client
		res.json(dbUser);
	  })
	  .catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	  });
	}
   });


module.exports = router
