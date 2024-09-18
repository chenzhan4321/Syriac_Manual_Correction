const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/syriac_parser');

app.get('/', (req, res) => {
  res.send('Syriac Paragraph Parser API');
});

app.use('/api', apiRoutes);

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

function startServer(port) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying the next one...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
}

startServer(PORT);