import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/v1/routes';

const app = express();

// log responses
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Welcome to Sequelize Pro'
  });
});

app.use('/api', routes);

app.get('*', (req, res) => {
  return res.status(200).send({
    error: 'Route not found'
  });
});

const port = process.env.PORT || 8003;

app.listen(port, () => console.log(`app listening on port ${port}`));
