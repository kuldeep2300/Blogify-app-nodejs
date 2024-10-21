const { validateToken } = require("../services/authentication");

const checkForAuthenticationCookie = (cookieName) => {
  // generic function
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }
    return next();
  };
};

module.exports = {
  checkForAuthenticationCookie,
};
