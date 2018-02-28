const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')
const uploader = require("express-fileuploader");/*MAIN PACKAGE TO UPLOAD*/

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
	const { username, password } = req.body
	console.log("********************",req.body);
	console.log("$$$$$$$$$$$$$$$$$$$$$",req.files["photo"]);
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}

		const newUser = new User({
					'local.username': username,
					'local.password': password
				});

		if(req.files["photo"]){
			uploader.upload("local", req.files["photo"], function(err, files) {
		    console.log("FILES", files);
		    if (err) {

		      return next(err);
		    }

				newUser.photo = files[0].url;

				newUser.save((err, savedUser) => {
					if (err) return res.json(err)
					return res.json(savedUser)
				});

			});
		}else{
			newUser.save((err, savedUser) => {
					if (err) return res.json(err)
					return res.json(savedUser)
				});
		}

		
	})
})
// {username: this.state.user, dogName: this.state.dogName, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed, location: this.state.location}
router.put('/signup', (req, res) => {

	const { username, thisUser, thatUser, saidYes, saidNo, dogName, owner, sex, fixed, location, matches, places, vetDate, image, messages, playdate, radius, lat, lng } = req.body;


	if (saidNo){
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'saidNo': saidNo } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	} 
	
	if (saidYes) {
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'saidYes': saidYes } }, { new: true })
		.then(data => res.send(data))
		.catch(err => ('Error: ', err));
	}

	if (matches){
		console.log("matches", matches);
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'matches': thatUser } }, { new: true })
		.then(data => {
			User.findOneAndUpdate({ 'local.username': thatUser },{ $push: { 'matches': thisUser } }, { new: true })
			.then(response => {
				console.log("data and response", data, response);
				res.send("Success!");
			})
			.catch(err => ('Error: ', err))
		})
		.catch(error => ("Second error: ", error))
	}

	if (dogName){


		User.findOneAndUpdate({ 'local.username': username },{ 'dogName': dogName, 'owner': owner, 'sex': sex, 'fixed': fixed, 'location': location, 'places': places, 'vetDate': vetDate, 'lng': lng, 'lat': lat, 'radius': radius}, { new: true })

		.then(data => {
			
			res.send(data);
		})
		.catch(err => {
			console.log('error: ', data );
			('Error: ', err)
		});
	}

	if (playdate){
		User.findOneAndUpdate({ 'local.username': username },{ $push: { 'playdates': playdate } }, { new: true })
		.then(data => {
			console.log('data: ', data );
			res.send(data);
		})
		.catch(err => {
			console.log('error: ', data );
			('Error: ', err)
		});
	}

	if(messages){
		console.log("This is where I'm trying to fix shit.", messages);
		console.log(thisUser);
		console.log(thatUser);
		User.findOneAndUpdate({ 'local.username': thisUser },{ $push: { 'messages': messages } }, { new: true })
		.then(data => {
			console.log(data);
			User.findOneAndUpdate({ 'local.username': thatUser },{ $push: { 'messages': messages } }, { new: true })
			.then(response => {
				console.log("data and response", data, response);
				res.send("tahdah!");
			})
			.catch(err => ('Error: ', err))
		})
		.catch(error => ("Second error: ", error))

	}
})



router.get('/signup', function(req, res) {


	User.find({})
	  .then(function(dbUser) {
		// If we were able to successfully find Articles, send them back to the client
		res.json(dbUser);
	  })
	  .catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	  });
   });



module.exports = router