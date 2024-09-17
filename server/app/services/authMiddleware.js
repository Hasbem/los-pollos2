/* eslint-disable consistent-return */
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookie?.auth_token;
    if (!token) {
      console.error("No auth token found");
      return res.sendStatus(401);
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);
    console.info("Token verified:", req.auth);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.sendStatus(401);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await tables.user.readWithPassword(req.body.email);

    if (!user) {
      return res.sendStatus(422);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    req.body.hashedPassword = hashedPassword;

    delete req.body.password;

    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { hashingOptions, getUserByEmail, verifyToken, hashPassword };