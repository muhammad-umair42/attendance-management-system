import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './db/index.js';

// Dotenv config
dotenv.config({ path: '/.env' });

const PORT = 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`App Running on PORT:${PORT}`));
  })
  .catch(error => console.log(`Database connection error:\n`, error));
