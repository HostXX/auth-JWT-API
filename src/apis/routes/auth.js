const express = require("express");
const bcrypt = require("bcrypt");
const nJwt = require("njwt");
const secureRandom = require("secure-random");
const { Users } = require("../database/models");
require("dotenv/config");
const generateJWT = require("../helperFunctions/generateJWT");

const router = express.Router();

const saltRounds = 12;

router.get("/", async (req, res, next) => {
  res.json({
    message: "Hi, from the auth",
  });
});

router.post("/singin", async (req, res, next) => {
  console.log(req.body);
  // encrypt the password here // AQUI!

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      // Now we can store the password hash in db.

      console.log(hash);

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

// secret
const signingKey = secureRandom(256, { type: "Buffer" });

// const isVerified = nJwt.verify(jwtoken.tokenCompact,signingKey)

// console.log(jwtoken.tokenCompact);

router.post("/login", async (req, res, next) => {
  Users.findOne({ email: req.body.email }, async function (err, doc) {
    if (!doc) {
      console.log("no hay usuario");
      res.json({
        message: "no hay usuario",
      });
    } else {
      // comienza aqui

      try {
        bcrypt.compare(req.body.password, doc.password, function (err, result) {
          console.log(result);
          if (result === true) {
            console.log("autenticado");
            //    res.redirect('/autenticatedHome')

            // generate a jwt for the authenticated user

            const expDate = new Date();
            const issuedDate = new Date();
            expDate.setMinutes(expDate.getMinutes() + 30);

            const claims = {
              sub: doc._id,
              name: doc.name,
              admin: false,
              iat: issuedDate,
              exp: expDate,
            };

            const { tokenCompact, rawJwt } = generateJWT(
              claims,
              signingKey,
              "HS256"
            );
            console.log(rawJwt);

            res.header("JWT-HEADER", tokenCompact);
            res.json({
              message: "autenticado",
            });
          } else {
            console.log("no autenticado");
            //    res.redirect('/loginPage')
            res.json({
              message: "no auntenticado",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});

module.exports = router;
