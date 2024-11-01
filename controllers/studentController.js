const students = require('../Models/studentModel')


exports.addStudent = async (req, res) => {
    try {
        const teacherId = req.payload
        const { name, dob, phonenumber, email, batch } = req.body
        const image = req.file.filename

        if (!name || !dob || !phonenumber || !email || !batch || !image) {
            res.status(400).json("Invalid data")
        } else {
            const newStudent = new students({
                name, dob, phonenumber, image, email, batch, teacherId
            })
            await newStudent.save()
            res.status(200).json(newStudent)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

exports.getStudent = async (req, res) => {
    const search=req.query.searchKey
    // console.log(search);
    
    try {
        const teacherId = req.payload
        const addedStudents = await students.find({ teacherId,name:{$regex : search , $options:'i'} })
        res.status(200).json(addedStudents)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params
        const result = await students.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

exports.editStudent = async (req, res) => {
    try {
        const { id } = req.params
        if (req.file) {
            var { name, dob, phonenumber, batch } = req.body
            var image = req.file.filename
        } else {
            var { name, dob, phonenumber, batch, image } = req.body
        }

        const existing = await students.findOne({ _id: id })

        existing.name = name
        existing.dob = dob
        existing.phonenumber = phonenumber
        existing.batch = batch
        existing.image = image

        await existing.save()
        res.status(200).json(existing)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }

}

