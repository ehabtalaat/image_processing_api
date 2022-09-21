import express from 'express';
import routes from './routes/index';
import File from './file';

const app: express.Application = express();
const port: number = 3000; // Default port

// Add routes
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  
  // Make sure that thumb path is available
  await File.createThumbPath();


});

export default app;
