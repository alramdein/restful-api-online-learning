import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import '@babel/core';
import '@babel/polyfill';
import { dbUrl } from './src/config/database.config';
import lessonRoutes from './src/routes/lesson.route';
import eventRoutes from './src/routes/event.route';

const PORT = 4000;

const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(json());

// Confirgure the database
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log(`Could not connect to database. Exiting now... ${err}`);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Online Learning application. Created by Alif Ramdani"});
});

// other api routes 
lessonRoutes(app);
eventRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});