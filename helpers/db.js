const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { dbName: process.env.DB_NAME, useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));