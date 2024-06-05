const express = require('express');
const app = express();
const port = 3000;
const token = require('./token');

app.get('/generate-token', (req, res) => {
  const sub = "user@example.com"; // Replace with your user identifier
  const name = "John Doe"; // Replace with your user's name
  const email = "user@example.com"; // Replace with your user's email
  const groups = ["group1", "group2"]; // Replace with your user's groups
  const jwtToken = token.generate(sub, name, email, groups);
  res.json(jwtToken);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
