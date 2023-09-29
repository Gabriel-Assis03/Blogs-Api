const schemas = require('./schemas');
const { User, Category } = require('../../models');

function isArrayContainedInArray(a, b) {
  return a.every((e) => b.includes(e));
}

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

const validatePost = async (keysObjectToValidate) => {
  const error1 = schemas.postSchema.validate(keysObjectToValidate);
  if (error1.error) return { status: 'INVALID_KEY', message: 'Some required fields are missing' };
  const { categoryIds } = keysObjectToValidate;
  const allCategory = await Category.findAll({
    attributes: { exclude: ['name'] },
  });
  const idsArray = allCategory.map((category) => category.dataValues.id);
  const isContained = isArrayContainedInArray(categoryIds, idsArray);
  if (!isContained) {
    return { status: 'INVALID_KEY',
      message: 'one or more "categoryIds" not found' }; 
  }
};

module.exports = {
  validateLogin,
  validateUser,
  validatePost,
};
