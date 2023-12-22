const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, '')));

console.log(app);

app.listen(PORT, () => {
  console.log(`Server started and listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
