import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

// log responses
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Sequelize Pro'
  })
});

app.get('*', (req, res) => {
  res.send({
    error: 'Route not found'
  })
});

const port = process.env.PORT || 8003;

app.listen(port, () => console.log(`app listening on port ${port}`));