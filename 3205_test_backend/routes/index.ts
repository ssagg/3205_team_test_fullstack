const router = require("express").Router();
const { getJson } = require("../controllers/search");

router.post("/", getJson);

module.exports = router;
