// const User = require('../models/User');

// const signUp = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the username or email already exists in the database
//     const existingUser = await User.findOne({   email  });
//     if (existingUser) {
//         const errorMessage = `${email} already exists`;

//       return res.status(400).json({ status: false, error: errorMessage });
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
