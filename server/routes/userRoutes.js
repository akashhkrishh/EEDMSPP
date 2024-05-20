const router = require('express').Router();
const multer  = require('multer');
const path = require('path');

const Controller = require('../controllers/userController');
const tokenVerify = require('../middlewares/VerifyToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/original/') 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+path.basename(file.originalname)) 
    }
});

const upload = multer({ storage: storage });


router.get("/",(req,res)=>{
  res.send('User');
})


router.get("/name",tokenVerify.validUser,(req,res)=>{
  res.send({name:req.user.name});
})

router.post('/create',Controller.register);
router.post('/login',Controller.login);
router.post("/fileupload",tokenVerify.validUser,upload.single('file'),Controller.fileUpload);
router.post("/decrypt",tokenVerify.validUser,Controller.decrypt);
router.post("/filecontent",tokenVerify.validUser,Controller.fileContent);
router.post("/attackfiles",tokenVerify.validUser,Controller.attackfiles);
router.get("/myfiles",tokenVerify.validUser,Controller.myfiles);
router.get("/myfilesize",tokenVerify.validUser,Controller.myfilesize);
router.get("/myfileData",tokenVerify.validUser,Controller.myfileData );

module.exports = router;