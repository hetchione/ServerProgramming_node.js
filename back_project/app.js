// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.sendFile('/Users/yunjaei/SVPG_PJ/front_project/index.html');
});
app.get('/enter', function(req, res){
  res.sendFile('/Users/yunjaei/SVPG_PJ/front_project/enter.html');
})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
