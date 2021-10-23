const express = require("express");
const bcrypt = require("bcrypt");
const { register, login } = require("../service/users");

const userAuth = (app) => {
  const router = express.Router();
  app.use("/api/auth", router);

  router.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "error",
      });
    }
    await register({ password, name, email });

    res.json({
      data: {
        name,
        email,
      },
      message: 'user created',
    })
    res.end();
  });

  router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "error",
      });
    }
    const userLogged = await login({ email, password });

    if (!userLogged) {
      return res.json({
        error: 404,
        message: "No user found!",
      });
    }
    // hash to password and validate pasword
    const isValidatePassword = await bcrypt.compare(password, userLogged.password);
    if (!isValidatePassword) {
      res.json({
        error: 403,
        message: 'Email or password invalide'
      })
    }
    //delete password in payload
    delete userLogged.password;
    res.json({
      userLogged,
      message: 'user found'
    });
    res.end();
  });
};

module.exports = userAuth;
