import express from 'express'
import logger from 'morgan';
import pingRouter from './routes/ping';
import usersRouter from './routes/users';
import session from 'express-session';

const port = process.env.PORT || 3000;

const app = express();


app.use(logger('dev'));

app.use('/', pingRouter);
app.use('/users', usersRouter);

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: process.env.SESSION_SECRET || "I love cats",
  cookie: { secure: false }
}))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

export default app;
