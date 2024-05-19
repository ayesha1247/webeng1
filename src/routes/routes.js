const express = require('express');
const router = express.Router()
//Post Method

const { createStudent, readStudents, updateStudent, deleteStudent }
= require("../controllers/crud")


//routes
router.route("/create").post(createStudent)
router.route("/read").get(readStudents)
router.route("/update").put(updateStudent)
router.route("/delete").delete(deleteStudent)






module.exports = router;