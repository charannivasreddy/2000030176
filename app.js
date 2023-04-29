const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/numbers', (req, res) => {
  const urls = req.query.url || [];
  let counter = 0;
  let numbers = [];

  urls.forEach(url => {
    axios.get(url, { timeout: 500 })
      .then(response => {
        if (response.data.numbers) {
          numbers = numbers.concat(response.data.numbers.filter(number => !numbers.includes(number)));
        }
      })
      .catch(() => {})
      .finally(() => {
        counter++;
        if (counter === urls.length) {
          numbers.sort((a, b) => a - b);
          res.json({ numbers });
        }
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
