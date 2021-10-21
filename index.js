const express = require('express');
const app = express();

app.get('/', (res, req) => {
  req.json({
    hello: 'world'
  })
})

app.listen('5000', () => {
  console.log(`listening http://localhost:5000`)
});