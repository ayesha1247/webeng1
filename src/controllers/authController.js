const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key'; // Replace with your actual secret key
//signup without password hashin not a good approach
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


const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorMessage = `${email} already exists`;
      return res.status(400).json({ status: false, error: errorMessage });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user instance with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ status: true, message: "User signed up successfully", user: newUser });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ status: false, error: "Failed to sign up user" });
  }
};




const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ status: false, error: 'Invalid email or password' });
    }

    // Generate a JWT token
    //jwt.sign(payload, secretOrPrivateKey, [options, callback]):
    // It takes three arguments:
    // payload: The data you want to include in the token.
    // secretOrPrivateKey: A secret key or a private key to sign the token.
    // options: Additional options for the token.
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });


    // Respond with success message and token
    res.status(200).json({ status: true, message: 'Login successful', token });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ status: false, error: 'Failed to login user' });
  }
};
const logout = async (req, res) => {
  
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');

    // console.log("logout");
    await User.findByIdAndUpdate(req.body.id);
    res.clearCookie("token");
    res.status(200).json({ status: true, message: "Logout successful" });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Logout unsuccessful",
    });
  }
};
module.exports = { signUp,login,logout };
