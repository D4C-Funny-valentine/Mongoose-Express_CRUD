const User = require("../model/User");

const handleLogout = async (req, res) => {
  // on client also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // No content
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
    });
    return res.sendStatus(204);
  }
  // delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result, "from Logout");
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure: true,
  });
  res.sendStatus(204); // no content
};

module.exports = { handleLogout };
