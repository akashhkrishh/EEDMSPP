const router = require('express').Router();

const Controller = require('../controllers/attackerController');


router.get("/",(req,res)=>{
  res.send('Attacker');
})

router.post('/attack',Controller.attack);
router.post('/search',Controller.search);

module.exports = router;