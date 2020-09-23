const jwt = require("jsonwebtoken");

module.exports = (user) => {
  // need 3 things to create a token: payload, secret, & options

  const payload = {
    id: user.id,
    email: user.email,
    // can add more non confidential data
  };

  const secret = "heE61FpVRwZ9YXynYeD8";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
};
