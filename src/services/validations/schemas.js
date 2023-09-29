const Joi = require('joi');

const nameSchema = Joi.string().min(5).required();

const addProduct = Joi.object({
  name: nameSchema,
});

const objectSchemaRequired = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().required().messages({
    'any.required': '"quantity" is required',
  }),
});

const objectSchemaQuantity = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).messages({
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

const newSale1 = Joi.array().items(objectSchemaRequired);
const newSale2 = Joi.array().items(objectSchemaQuantity);

module.exports = {
  addProduct,
  newSale1,
  newSale2,
};