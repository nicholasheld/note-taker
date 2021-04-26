// Dependencies
const express = require('express');

const app = express();
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;//8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

// Starts our server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});