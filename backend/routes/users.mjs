import express from 'express'
import { getUser } from '../services/users.mjs';

var router = express.Router();


/* GET users listing. */
router.get('/', function (_, res, __) {
  res.send('Users Api is On');
});

router.get('/profile', function (req, res, _) {
  res.send(getUser(req.query.email))
});


export default router;
