import express from 'express'
var router = express.Router();

// Health check route
router.get('/', function (_: any, res: any, __: any) {
  res.send('pong');
});

export default router;
