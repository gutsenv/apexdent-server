const Joi = require("joi");
const appointmentDBSchema = require("../modules/appointment/appointment.schema");
const dentistDBSchema = require("../modules/dentist/dentist.schema");
const userDBSchema = require("../modules/user/user.schema");
const { HTTP_STATUS_CODES } = require("../utils/constants");

const transformDbSchematoJoiSchema = (attributeDefinitions) => {
  return Joi.object({
    ...Object.entries(attributeDefinitions).reduce((schema, [_, attr]) => {
      const { AttributeName, AttributeType, required } = attr;
      let args = `${AttributeType.toString()}`;
      if (required) args += "-required";

      switch (args) {
        case "S-required":
          schema[AttributeName] = Joi.string().required();
          break;
        case "S":
          schema[AttributeName] = Joi.string().optional();
          break;
        default:
          schema[AttributeName] = Joi.any();
      }

      return schema;
    }, {}),
  });
};

const validateAppointmentInput = (req, res, next) => {
  const { error } = transformDbSchematoJoiSchema(
    appointmentDBSchema.AttributeDefinitions
  ).validate(req.body);
  if (error) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

const validateDentistInput = (req, res, next) => {
  const { error } = transformDbSchematoJoiSchema(
    dentistDBSchema.AttributeDefinitions
  ).validate(req.body);
  if (error) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

const validateUserInput = (req, res, next) => {
  const { error } = transformDbSchematoJoiSchema(
    userDBSchema.AttributeDefinitions
  ).validate(req.body);
  if (error) {
    return res
      .status(HTTP_STATUS_CODES.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateAppointmentInput,
  validateDentistInput,
  validateUserInput,
};
