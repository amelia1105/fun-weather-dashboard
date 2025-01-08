import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// serve static files of entire client dist folder
app.use(express.static('../client/dist'));

// implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// implement middleware to connect the routes
app.use(routes);

// start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
