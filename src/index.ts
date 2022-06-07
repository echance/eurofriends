import express from 'express';
import mongoose from 'mongoose';
import participantRouter from './routes/participant-router';

const app = express();
const port = 8000;
app.use('/participants', participantRouter);
app.get('/', (req, res) => {
  res.send('Welcome to node.js world!!');
});
var mongoDB = 'mongodb://127.0.0.1:27017/eurodb'
mongoose.connect(mongoDB).then(async () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  app.listen(port, () => {
    console.log(`The application is listening on port: ${port}`);
  });
})
