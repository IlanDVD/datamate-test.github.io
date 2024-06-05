const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");
const uid = require('uid-safe');
const config = require("../config/config");

const key = fs.readFileSync(".data/private.key.pem", "utf8");

function generate(sub, name, email, groups) {
  const signingOptions = {
    keyid: config.keyid,
    algorithm: "RS256",
    issuer: config.issuer,
    expiresIn: "30s", //Expires 30 seconds after the issue date/time.
    notBefore: "1s", //JWT is valid 1 second after the issue date/time.
    audience: "qlik.api/login/jwt-session"
  };

  const payload = {
    jti: uid.sync(32), // 32 bytes random string
    sub: sub,
    subType: "user",
    name: name,
    email: email,
    email_verified: true,
    groups: groups
  };

  const token = jsonWebToken.sign(payload, key, signingOptions);
  return token;
}

module.exports = { generate };
