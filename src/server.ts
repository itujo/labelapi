import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running at ${`http://localhost:${port}/`}.`);
});
