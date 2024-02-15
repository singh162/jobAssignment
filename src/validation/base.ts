import Joi, { ValidationError } from 'joi';

interface Inputs {
  [key: string]: any;
}

interface Schema {
  validate(inputs: Inputs): { error?: ValidationError };
}

function validateSchema(inputs: Inputs, schema: Schema): Promise<boolean> {
  return new Promise(function (fulfill, reject) {
    try {
      let { error } = schema.validate(inputs);
      if (error) {
        if (error.details) {
          reject({ "schemaError": true, "message": error.details[0].message.replace(/['"]+/g, '') });
        } else {
          fulfill(false);
        }
      } else {
        fulfill(true);
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

function validateSchemaReturnError(inputs: Inputs, schema: Schema): Promise<boolean | object> {
  return new Promise(function (fulfill, reject) {
    try {
      let { error } = schema.validate(inputs);
      if (error) {
        if (error.details) {
          fulfill({ "schemaError": true, "message": error });
        } else {
          fulfill(false);
        }
      } else {
        fulfill(true);
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

export { 
  validateSchema,
  validateSchemaReturnError
};
