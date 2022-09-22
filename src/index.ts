import express from 'express';
import routes from './routes/index';
// import File from './file';
import path from 'path';

const app: express.Application = express();
const port = 3000; // Default port

// Add routes
app.use(routes);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
export default app;
