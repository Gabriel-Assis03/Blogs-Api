const { Category } = require('../models');
// const { validateUser } = require('./validations/validationsInputValues');

const postCategories = async (req) => {
  const { name } = req.body;
  if (!name) return { status: 'INVALID_KEY', data: { message: '"name" is required' } };
  const newCategory = await Category.create({
    name,
  });
  return { status: 'CREATED', data: newCategory };
};

module.exports = {
  postCategories,
};
