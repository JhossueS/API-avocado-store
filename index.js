const express = require('express');
const helmet = require('helmet');
const { config } = require('./config')
const app = express();

const avocadoApi = require('./Routes/avocados');
const userApi = require('./Routes/usersAuth');

// body parser
app.use(express.json());
app.use(helmet());

// routes
avocadoApi(app);
userApi(app);

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`)
});