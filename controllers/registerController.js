const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const duplicatedEmail = await User.findOne({ email }).exec();
  if (duplicatedEmail) {
    return res.status(409).json({ message: "This email is already taken" });
  }
  try {
    // encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      email: email,
      password: hashPassword,
    });
    console.log(result, " from register");
    res.status(201).json({ success: true, message: `Register successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };