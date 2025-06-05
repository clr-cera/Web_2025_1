import express from 'express'
import logger from 'morgan';
import pingRouter from './routes/ping';
import usersRouter from './routes/users';
import elementsRouter from './routes/elements';

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
