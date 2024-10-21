const JWT = require("jsonwebtoken");

const secret = "$uperMan123@#";

// This function create the token for the user for Authentication
const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

// This function validate the user token and return the payload data
const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
