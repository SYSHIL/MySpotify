const express = require('express');
const routes = require('./routes/spotify.js'); // Import the routes module
const path = require('path');
require("dotenv").config();

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// Use the cookie-parser middleware
app.use(cookieParser());

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.set('view engine', 'ejs');
// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'views'));



//  api routes
app.use(routes);


// port number
const port = 3000
// Assuming your "public" directory is in the same folder as your server file

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
  
