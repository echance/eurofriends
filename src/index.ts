import express from 'express';
import mongoose from 'mongoose';
import participantRouter from './routes/participant-router';
import morgan from 'morgan';

const logger = require('./logger')(module)
const morganMiddleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)!),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)!),
    });
  },
  {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }
)
const app = express();
const port = 8000;
app.use(morganMiddleware);
app.use('/participants', participantRouter);
app.get('/', (req, res) => {
  res.send('hey');
});
var mongoDB = 'mongodb://127.0.0.1:27017/eurodb'
mongoose.connect(mongoDB).then(async () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  app.listen(port, () => {
    console.log(`The application is listening on port: ${port}`);
  });
})
