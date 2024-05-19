const router = require('express').Router();

const Controller = require('../controllers/serverController');

router.get("/",(req,res)=>{
  res.send('Server');
})

router.get('/allfilelist',Controller.allfilelist);
router.get('/attacklist',Controller.attacklist);
router.get('/userlist',Controller.userlist);
router.get('/count',Controller.count);

module.exports = router;