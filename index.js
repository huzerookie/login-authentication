//Imports
const express = require('express');
const bodyparser = require('body-parser');
const hbs = require('hbs');
const app = express();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }))
const path = require("path");
const User = require('./db/userMongoose')
const initializePassport = require('./public/utils/js/config')
const dotenv = require('dotenv').config()
let message1 = '';
let message2 = '';
let messageRegister = '';


//Path Formation
const publicPathDirectory = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");
const bootstrapPath = path.join(__dirname, "/node_modules/bootstrap/dist/css");
const fontawesomePath = path.join(__dirname, "/node_modules/fontawesome/css");

//Setup Handlerbars engine and view location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.use(express.static(publicPathDirectory));
app.use("/nodemodules", express.static(path.join(__dirname, "node_modules/")));

//Setup Passport
initializePassport(passport,
    async email => await User.findOne({ email })
)
app.use(flash())
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Routing
app.get('/login', checkNotAuthenticated, (req, res) => {
    //res.send('Hello World');
    messageRegister = '';
    res.render('login', {
        message1,
        message2
    });
})
app.get('/', checkAuthenticated, (req, res) => {
    //res.send('Hello World');
    res.redirect('/user-list');
})

/* app.post('/login', checkNotAuthenticated, async (req, res) => {
    message1 = '';
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.redirect('/user-list');
    } catch (e) {
        message2 = e.message;
        res.redirect('/login');
    }

}) */
app.post('/login', [checkNotAuthenticated, emptyRegisterSuccess], passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    //res.send('Hello World'); 
    message1 = ''
    message2 = ''
    res.render('register', { messageRegister });
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    //console.log(req.body);    
    req.body.password = await bcrypt.hash(req.body.password, 8)
    const user = new User(req.body);
    console.log(user)
    try {
        await User.checkDuplicates(req.body.email);
        await user.save()
        message1 = 'Thank you for Registering!';
        messageRegister = '';
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        messageRegister = e.message
        res.redirect('/register');
    }

})

app.get('/user-list', checkAuthenticated, async (req, res) => {
    message1 = '';
    message2 = '';
    messageRegister = '';

    let currentUser;
    if (req.session.passport.user) {
        currentUser = await User.findById({ _id: req.session.passport.user });
    }
    res.render('user-list', { 'firstName': currentUser.firstName, 'lastName': currentUser.lastName });
})

app.get('/users', checkAuthenticated, async (req, res) => {
    const users = await User.find({});
    res.send(users);
})
//Logout
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

//If user tries to navigate to other routes without logging
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

//If user tries to navigate to login/register routes 
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

function emptyRegisterSuccess(req, res, next) {
    message1 = '';
    next();
}

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})