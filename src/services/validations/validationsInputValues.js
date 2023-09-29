const schemas = require('./schemas');
const { User } = require('../../models');

const validateLogin = (keysObjectToValidate) => {
  const { email, password } = keysObjectToValidate;
  if (!email || !password) {
    return {
      status: 'INVALID_KEY', message: 'Some required fields are missing', 
    }; 
  }
};

const validateUser = async (keysObjectToValidate) => {
  const { displayName, email, password } = keysObjectToValidate;
  const error1 = schemas.displayNameSchema.validate(displayName);
  if (error1.error) return { status: 'INVALID_KEY', message: error1.error.message };
  const error2 = schemas.emailSchema.validate(email);
  if (error2.error) return { status: 'INVALID_KEY', message: error2.error.message };
  const error3 = schemas.passwordSchema.validate(password);
  if (error3.error) return { status: 'INVALID_KEY', message: error3.error.message };
  const user = await User.findOne({ where: { email } });
  if (user) return { status: 'CONFLICT', message: 'User already registered' };
};

module.exports = {
  validateLogin,
  validateUser,
};
