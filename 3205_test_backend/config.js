require("dotenv").config();

const { PORT = "3001" } = process.env;

module.exports = {
  PORT,
};
