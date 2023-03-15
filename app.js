const path = require('path');

const express = require('express');
const session = require('express-session');

const admin = require('./routes/admin');
const bank = require('./routes/bank');
const auth = require('./routes/auth');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'insecurebank', resave: false, saveUninitialized: false
}));

app.use('/admin', admin);
app.use('/', bank);
app.use(auth)
app.use(errorController.get404);


app.listen(3000);