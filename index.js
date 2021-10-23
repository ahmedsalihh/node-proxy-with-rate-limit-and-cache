require('dotenv').config;
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');

const PORT = process.env.port || 5000;

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
});

app.use(limiter);
app.set('trust proxy', 1);

app.use(cors());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PPORT}`));
