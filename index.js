const crypto = require("crypto");

function hasher(data, cost = 10, salt) {
  if (!salt) salt = crypto.randomBytes(16).toString("base64").slice(0, -2);
  const hashO = crypto.createHash("sha256");
  for (let i = 0; i < 2 ** cost; i++) {
    hashO.update(salt + data);
  }
  return [cost, salt, hashO.digest("base64").slice(0, -1)].join(".");
}

function compare(data, hash) {
  const [cost, salt] = hash.split(".");
  const newHash = hasher(data, cost, salt);
  return newHash == hash;
}

const password = "hello world";
const hash = hasher(password);
console.log(hash);
console.log(compare(password, hash));
