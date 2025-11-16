import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './server/server.js';
import config from './config/config.js';

mongoose.Promise = global.Promise;

(async () => {
  try {
    // With Mongoose v8+, no need for useNewUrlParser/useUnifiedTopology
    await mongoose.connect(config.mongoUri, { dbName: config.dbName });
    console.log('Connected to the database');

    // Optional: connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('Mongo connection error:', err?.message || err);
    });

    app.listen(config.port, (err) => {
      if (err) return console.error(err);
      console.info(`Server started on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to database:', err?.message || err);
    process.exit(1);
  }
})();
