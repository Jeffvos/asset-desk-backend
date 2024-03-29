const Joi = require("@hapi/joi");

const registrationValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};
const registrationEmployeeValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    department: Joi.string()
      .min(3)
      .required(),
    startdate: Joi.date()
      .required()
  });
  return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.registrationEmployeeValidation = registrationEmployeeValidation;