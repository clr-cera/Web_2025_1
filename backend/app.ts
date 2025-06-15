import express from 'express'
import logger from 'morgan';
import pingRouter from './routes/ping.ts';
import usersRouter from './routes/users.ts';
import elementsRouter from './routes/elements.ts';
import cors from 'cors';

// If PORT is defined, use it; otherwise, default to 3001
const port = process.env.PORT || 3001;

const app = express();

// Use express json to access easily the body of the request
app.use(express.json());


// Use morgan logger to log requests
app.use(logger('dev'));
// Use CORS to allow all origins
app.use(cors())

// Set up routes
// ping, users and elements routes
app.use('/', pingRouter);
app.use('/users', usersRouter);
app.use('/elements', elementsRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

export default app;
