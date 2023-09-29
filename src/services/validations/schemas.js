const Joi = require('joi');

const displayNameSchema = Joi.string().min(8).messages({
  'string.min': '"displayName" length must be at least 8 characters long',
}).required();

const passwordSchema = Joi.string().min(6).messages({
  'string.min': '"password" length must be at least 6 characters long',
}).required();

const emailSchema = Joi.string().email({
  minDomainSegments: 2,
}).messages({
  'string.email': '"email" must be a valid email',
}).required();

module.exports = {
  displayNameSchema,
  emailSchema,
  passwordSchema,
};