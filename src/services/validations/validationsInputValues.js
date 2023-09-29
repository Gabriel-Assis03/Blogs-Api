// const schemas = require('./schemas');

const validateLogin = (keysObjectToValidate) => {
  const { email, password } = keysObjectToValidate;
  if (!email || !password) {
    return {
      status: 'INVALID_KEY', message: 'Some required fields are missing', 
    }; 
  }
  // const { error } = schemas.addProduct.validate(keysObjectToValidate);
  // if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateLogin,
};
