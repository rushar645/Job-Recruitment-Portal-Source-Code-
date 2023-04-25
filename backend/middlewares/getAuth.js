module.exports = (req, res, next) => {
    if (req.session.isAuthenticated) {
      next();
      return;
    }
    else {
        res.statusMessage = "Session Expired!";
        res.status(105).end();
    }
  }