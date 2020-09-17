const express = require("express");
const bcrypt = require("bcrypt");
const nJwt = require("njwt");
const secureRandom = require("secure-random");
const { Users, Jwt } = require("../database/models");
require("dotenv/config");
const generateJWT = require("../helperFunctions/generateJWT");

const router = express.Router();

const saltRounds = 12;

router.get("/", async (req, res, next) => {

  res.json({
    message: "Hi, from the auth",
  });
});

router.post("/refreshtoken", async (req, res, next) => {
  nJwt.verify(req.headers["refreshtoken"], process.env.SING_KEY, function (
    err,
    verifiedJwt
  ) {
    if (err) {
      return res.json({
        message: err.message,
      });
    } else {
      const claimss = {
        sub: verifiedJwt.body.sub,
        name: verifiedJwt.body.name,
        admin: false,
      };
      const {
        tokenCompact: token,
        rawJwt: rawToken,
      } = generateJWT(claimss, process.env.SING_KEY, 1 * 60 * 1000);

      return res.json({
        "token" : token
      })
    }
  });
});

router.get("/authTokenNeededRoute", async (req, res, next) => {

  if (req.headers["token"] === "" || !req.headers["token"]) {
    return res.json({
      message: "no token",
    });
  }
  nJwt.verify(req.headers["token"], process.env.SING_KEY, function (
    err,
    verifiedJwt
  ) {
    if (err) {
      return res.json({
        message: err.message,
      });
    } else {
      // console.log(verifiedJwt.body); // Will contain the header and body
      Users.findOne({ _id: verifiedJwt.body.sub }, async (err, user) => {
        if (err) {
          return res.json({
            message: "error error",
          });
        }
        if (!user) {
          return res.json({
            message: "error user",
          });
        }

        if (user) {
          return res.json({
            "authtenticated-INFO": verifiedJwt.body.name,
          });
        }
      });
    }
  });
});

router.post("/singin", async (req, res, next) => {
  Users.findOne({ email: req.body.email }, async function (err, user) {
    if (user) {
      return res.json({
        message: "nope",
      });
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const role = "USER";

        const newUser = await new Users({
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          password: hash,
          role: role,
        });

        try {
          const saveUser = await newUser.save();
          console.log(saveUser);

          res.json({
            id: saveUser._id,
            email: saveUser.email,
            name: saveUser.name,
            surname: saveUser.surname,
          });
          // res.redirect('/login')
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

// secret to hash token
// const signingKey = secureRandom(256, { type: "Buffer" });

router.post("/login", async (req, res, next) => {
  if (req.body) {
    Users.findOne({ email: req.body.email }, async function (err, user) {
      if (!user) {
        res.json({
          message: "no hay usuario",
        });
      } else {
        // comienza aqui
        try {
          bcrypt.compare(req.body.password, user.password, async function (
            err,
            result
          ) {
            if (result === true) {
              const claims = {
                sub: user._id,
                name: user.name,
                admin: false,
              };

              const { tokenCompact: jwToken, rawJwt: rawToken } = generateJWT(
                claims,
                process.env.SING_KEY,
                1 * 60 * 1000
              );

              const {
                tokenCompact: refrestTokenCompact,
                rawJwt: refrestRawJwt,
              } = generateJWT(claims, process.env.SING_KEY, 60 * 60 * 1000);

              res.cookie("refreshToken", refrestTokenCompact, {
                expires: new Date(Date.now() + 900000),
              });
              // res.cookie("httpOnly", "claro que si", {
              //   expires: new Date(Date.now() + 900000),
              //   httpOnly: true,
              //   secure: true,
              // });

              return res.json({
                token: jwToken,
                refreshToken: refrestTokenCompact,
              });
            } else {
              console.log("no autenticado");
              //    res.redirect('/loginPage')
              return res.json({
                message: "no auntenticado",
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  } else {
    res.json({
      message: "please enter the credentials",
    });
  }
});

module.exports = router;
