import express from 'express'
import logger from 'morgan';
import pingRouter from './routes/ping.ts';
import usersRouter from './routes/users.ts';
import elementsRouter from './routes/elements.ts';

const port = process.env.PORT || 3001;

const app = express();


app.use(logger('dev'));

app.use('/', pingRouter);
app.use('/users', usersRouter);
app.use('/elements', elementsRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

export default app;
