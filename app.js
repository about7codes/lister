const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const auth = require('./helpers/auth');

require('dotenv').config();
require('./helpers/db');

// app
const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors());

// routes
app.use('/user', userRoutes);
app.use('/notes', auth, noteRoutes);


app.get('/', (req, res) => {
    res.send('Hello Lister!');
});


app.listen(port, () => console.log("App running on port: " + port));