"use strict";

const joi = require("joi");
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

module.exports = app => {
  const router = app.get("router");

  router.post("/register", (req, res) => {
    const { email, password, password_confirm, accountType } = req.body;

    joi.validate(
      { email, password, password_confirm },
      joi.object().keys({
        email: joi.string().email().required().label('User Email'),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password_confirm: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation'} })
      }),
      err => {
        if (err) {
          return res.status(403).send({
            error: true,
            message: err
          });
        }

        app.models.users
          .count({ where: { email: email } })
          .exec((err, count) => {
            if (err) {
              console.log(err);
              res.status(500).send({
                error: true,
                message: "INTERNAL SERVER ERROR"
              });
            }

            if (count > 0) {
              console.log("User already exists");
              return res.status(403).send({
                error: true,
                message: 'Email already in use...'
              });
            }

            const password_hash = bcrypt.hashSync(password, 10);
            app.models.users
              .create({
                userId: uuid.v4(),
                email,
                password: password_hash,
                accountType: accountType,
                accountStatus: 'active'
              })
              .exec((err, user) => {
                if (err) {
                  console.log('Error: ', err)
                  return res.status(500).send({
                    error: true,
                    message: "INTERNAL SERVER ERROR"
                  });
                }

                res.status(200).send({
                  status: true,
                  message: "User successfully registered"
                });
              });
          });
      }
    );
  });

  router.get("/users", (req, res) => {
    app.models.users.find({}, (err, users) => {
      if (err) {
        return res.status(500).send({
          error: true,
          message: "INTERNAL SERVER ERROR"
        });
      }

      res.status(200).send({
        status: true,
        message: "SUCCESS",
        data: users
      });
    });
  });

  return router;
};
