const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пожалуйста, авторизуйтесь'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'keep-me-safe');
  } catch (err) {
    if (!payload) {
      next(new UnauthorizedError('Пожалуйста, авторизуйтесь'));
    } else {
      next(err);
    }
  }

  req.user = payload;

  next();
};
