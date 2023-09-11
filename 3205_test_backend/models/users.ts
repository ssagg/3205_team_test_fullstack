const { readFileSync } = require("fs");

const loadUsers = () => {
  const users = JSON.parse(readFileSync("./const.json"));
  return users;
};

module.exports = loadUsers;
