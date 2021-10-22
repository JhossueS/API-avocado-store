const express = require('express');
const helmet = require('helmet');
const { config } = require('./config')
const app = express();

const productsApi = require('./Routes/avocados');

// body parser
app.use(express.json());
app.use(helmet());
// routes
productsApi(app);

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`)
});