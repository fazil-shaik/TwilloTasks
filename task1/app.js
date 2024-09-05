const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
