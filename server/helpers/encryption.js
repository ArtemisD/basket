const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const crypto = require('crypto');

exports.verifyPassword = (string, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(string, hash, (err, isMatch) => {
      if (err) {
        reject('Password does not match');
      }
      resolve();
    });
  });
};

exports.createHash = (string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, (err, salt) => {
      bcrypt.hash(string, salt, null, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

exports.generateSecret = (len) => {
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
};