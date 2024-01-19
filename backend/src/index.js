import { app } from './app.js';
import { connectDB } from './db/index.js';

const PORT = 4000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`App Running on PORT:${PORT}`));
  })
  .catch(error => console.log(`Database connection error:\n`, error));
