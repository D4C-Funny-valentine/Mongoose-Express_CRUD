const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User id required." });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user)
    return res
      .status(204)
      .json({ message: `User id ${req.body.id} is not match` });
  if (user.roles?.Admin) {
    res.status(405).json({ message: "Sorry you can't delete your account because you're a admin" });
  } else {
    const result = await User.deleteOne({ _id: req.body.id });
    console.log(result);
    res.status(204);
  }
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User id parameter required." });
  const user = await User.findOne({ _id: req.params?.id }).exec();
  if (!user)
    return res
      .status(204)
      .json({ message: `User id ${req.params.id} is not match` });
  res.json(user);
};

module.exports = { getAllUsers, getUser, deleteUser };
