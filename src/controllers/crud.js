const Student = require('../models/students');

// Create student
const createStudent = async (req, res) => {       
  try {
    console.log(req.body)
    const { name, age, email } = req.body;
    const newStudent = new Student({ name, age, email });
    await newStudent.save();
    res.status(201).json({ status: true, message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error(error);

    res.status(500).json({ status: false, error: "Failed to create student" });
  }
};

// Read students 
const readStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed to fetch students" });
  }
};

// Update student
// const updateStudent = async (req, res) => {
//   try {
//     let studentId = req.body.id;
//     console.log(studentId)
//     const { name, age, email } = req.body;
//     const updatedStudent = await Student.findByIdAndUpdate(studentId, { name, age, email }, { new: true });
//     if (!updatedStudent) {
//       return res.status(404).json({ status: false, error: "Student not found" });
//     }
//     res.status(200).json({ status: true, message: "Student updated successfully", student: updatedStudent });
//   } catch (error) {
//     res.status(500).json({ status: false, error: "Failed to update student" });
//   }
// };

const updateStudent = async (req, res) => {
  try {
    // Extract the studentId from the request body
    const { id: studentId, name, age, email } = req.body;

    // console.log(studentId);

    // Use the findByIdAndUpdate method to update the student record
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, age, email },
      { new: true }
    );

    // Check if the student was found and updated
    if (!updatedStudent) {
      return res.status(404).json({ status: false, error: "Student not found" });
    }

    // Return a success response with the updated student data
    res.status(200).json({
      status: true,
      message: "Student updated successfully",
      student: updatedStudent
    });
  } catch (error) {
    // Handle any errors that occurred during the update
    res.status(500).json({ status: false, error: "Failed to update student" });
  }
};


// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id:studentId } = req.body;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ status: false, error: "Student not found" });
    }
    res.status(200).json({ status: true, message: "Student deleted successfully", student: deletedStudent });
  } catch (error) {
    res.status(500).json({ status: false, error: "Failed to delete student" });
  }
};

// const User = require('../models/User');

// const signUp = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the username or email already exists in the database
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ status: false, error: "Username or email already exists" });
//     }

//     // Create a new user instance
//     const newUser = new User({ username, email, password });

//     // Save the new user to the database
//     await newUser.save();

//     // Respond with success message
//     res.status(201).json({ status: true, message: "User signed up successfully", user: newUser });
//   } catch (error) {
//     // Handle any errors
//     res.status(500).json({ status: false, error: "Failed to sign up user" });
//   }
// };

// module.exports = { signUp };

module.exports = { createStudent, readStudents, updateStudent, deleteStudent };
