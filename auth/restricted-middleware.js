module.exports = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).json({ message: "Need to login first." });
  }
};
