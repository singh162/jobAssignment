// Importing Joi for schema validation and a custom validateSchema function from the 'base' module.
import Joi from 'joi';
import { validateSchema } from './base';

// Function to validate the request body for a POST operation.
function __validatePost(req: any, property: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for POST request validation.
            const schema = Joi.object({
                // Subschemas for 'vehicle', 'owner', 'insurance', and 'maintenance'.
                vehicle: Joi.object({
                    make: Joi.string().optional().allow(null, "", "undefined"),
                    model: Joi.string().required(),
                    year: Joi.number().required(),
                    color: Joi.string().required(),
                    registration_plate: Joi.string().required(),
                    start_date: Joi.date().required(),
                    end_date: Joi.date().allow(null),
                }),
                owner: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    phone_number: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
                }),
                insurance: Joi.object({
                    insurance_company: Joi.string().required(),
                    policy_number: Joi.string().required(),
                    expiry_date: Joi.date().iso().required(),
                }),
                maintenance: Joi.object({
                    maintenance_type: Joi.string().required(),
                    date: Joi.date().iso().required(),
                    cost: Joi.number().precision(2).positive().required(),
                    description: Joi.string().allow(''),
                }),
            });

            // Validate the request against the defined schema.
            validateSchema(req[property], schema)
                .then((validationResult) => {
                    fulfill(validationResult);
                })
                .catch((ex) => {
                    reject(ex);
                    return;
                });
        } catch (ex) {
            throw ex;
        }
    });
}

// Function to validate the request body for a PUT operation.
function __validatePut(req: any, body: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for PUT request validation.
            const schema = Joi.object({
                vehicle: Joi.object({
                    vehicle_id: Joi.number().required(),
                    make: Joi.string().optional().allow(null, "", "undefined"),
                    model: Joi.string().required(),
                    year: Joi.number().required(),
                    color: Joi.string().required(),
                    registration_plate: Joi.string().required(),
                    start_date: Joi.date().required(),
                    end_date: Joi.date().allow(null),
                }),
                owner: Joi.object({
                    owner_id: Joi.number().required(),
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().email().required(),
                    phone_number: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
                }),
                insurance: Joi.object({
                    insurance_company: Joi.string().required(),
                    policy_number: Joi.string().required(),
                    expiry_date: Joi.date().iso().required(),
                }),
                maintenance: Joi.object({
                    maintenance_type: Joi.string().required(),
                    date: Joi.date().iso().required(),
                    cost: Joi.number().precision(2).positive().required(),
                    description: Joi.string().allow(''),
                }),
            });

            // Validate the request against the defined schema.
            validateSchema(req[body], schema)
                .then((validationResult) => {
                    fulfill(validationResult);
                })
                .catch((ex) => {
                    reject(ex);
                    return;
                });
        } catch (ex) {
            reject(ex);
        }
    });
}

// Function to validate the request parameters for a GET operation.
function __validateGet(req: any, params: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for GET request validation.
            const schema = Joi.object({
                vehicleId: Joi.number().required(),
            });

            // Validate the request against the defined schema.
            validateSchema(req[params], schema)
                .then((validationResult) => {
                    fulfill(validationResult);
                })
                .catch((ex) => {
                    reject(ex);
                    return;
                });
        } catch (ex) {
            reject(ex);
        }
    });
}

// Function to validate the request parameters for a DELETE operation.
function _validateDelete(req: any, params: string): Promise<any> {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for DELETE request validation.
            const schema = Joi.object({
                vehicleId: Joi.number().required(),
                ownerId: Joi.number().required(),
            });

            // Validate the request against the defined schema.
            validateSchema(req[params], schema)
                .then((validationResult) => {
                    fulfill(validationResult);
                })
                .catch((ex) => {
                    reject(ex);
                    return;
                });
        } catch (ex) {
            reject(ex);
        }
    });
}

// Exporting validation functions for use in other modules.
export {
    __validatePost,
    __validatePut,
    _validateDelete,
    __validateGet,
};
