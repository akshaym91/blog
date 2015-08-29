var validator = require('emailValidator');
module.exports = function(email) {
  return validator.validate(email);
};
