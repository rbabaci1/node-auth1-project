module.exports = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).end();
  }
};
