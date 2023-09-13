const router = require("express").Router();
const { celebrate, Joi, errors } = require("celebrate");
const { getJson } = require("../controllers/search");
const mail = require("../utils/regexPattern");

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(mail),
      number: Joi.exist(),
    }),
  }),

  getJson
);

module.exports = router;
