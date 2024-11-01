const express=require('express')
const userController=require('../controllers/userController')
const studentController=require("../controllers/studentController")
const jwtMidlle=require('../middlewares/jwtMiddleware')
const multerMidddle=require('../middlewares/multerMiddleware')

const router=express.Router()

router.post('/reg',userController.userRegistration)
router.post('/log',userController.userLogin)

router.post('/addstudent',jwtMidlle,multerMidddle.single("image"),studentController.addStudent)
router.get('/addedstudents',jwtMidlle,studentController.getStudent)
router.delete('/deletestudent/:id',jwtMidlle,studentController.deleteStudent)
router.put('/editstudent/:id',jwtMidlle,multerMidddle.single('image'),studentController.editStudent)

module.exports=router
