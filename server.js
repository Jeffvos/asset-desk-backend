const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established');
});

const assetsRouter = require('./routes/assets');
const employeesRouter = require('./routes/employees');
const authRouter = require('./routes/auth');

app.use('/api/assets', assetsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
