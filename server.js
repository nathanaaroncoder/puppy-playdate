// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 3001
const corsPrefetch = require('cors-prefetch-middleware');
const imagesUpload = require('images-upload-middleware');


const path = require("path");
const uploader = require("express-fileuploader");/*MAIN PACKAGE TO UPLOAD*/
const multiparty = require("connect-multiparty"); /*MUST INSTALL THIS ADDITIONAL PACKAGE*/

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

app.use("/auth/signup", multiparty());


//Setting up the upload directory and the base url for image link
uploader.use(
  new uploader.LocalStrategy({
    uploadPath: "/uploads",
    baseUrl: `http://127.0.0.1:${PORT}/uploads/`
  })
);

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, './client/build/static')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, './client/build/'))
	})
}

/* Express app ROUTING */

//Route for profile image retrieval
app.get("/uploads/:id", (req, res) => {
  res.sendFile(path.join(__dirname, `uploads/${req.params.id}`));
});

app.use('/auth', require('./auth'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
