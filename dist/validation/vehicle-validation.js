"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__validateGet = exports._validateDelete = exports.__validatePut = exports.__validatePost = void 0;
// Importing Joi for schema validation and a custom validateSchema function from the 'base' module.
const joi_1 = __importDefault(require("joi"));
const base_1 = require("./base");
// Function to validate the request body for a POST operation.
function __validatePost(req, property) {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for POST request validation.
            const schema = joi_1.default.object({
                // Subschemas for 'vehicle', 'owner', 'insurance', and 'maintenance'.
                vehicle: joi_1.default.object({
                    make: joi_1.default.string().optional().allow(null, "", "undefined"),
                    model: joi_1.default.string().required(),
                    year: joi_1.default.number().required(),
                    color: joi_1.default.string().required(),
                    registration_plate: joi_1.default.string().required(),
                    start_date: joi_1.default.date().required(),
                    end_date: joi_1.default.date().allow(null),
                }),
                owner: joi_1.default.object({
                    first_name: joi_1.default.string().required(),
                    last_name: joi_1.default.string().required(),
                    email: joi_1.default.string().email().required(),
                    phone_number: joi_1.default.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
                }),
                insurance: joi_1.default.object({
                    insurance_company: joi_1.default.string().required(),
                    policy_number: joi_1.default.string().required(),
                    expiry_date: joi_1.default.date().iso().required(),
                }),
                maintenance: joi_1.default.object({
                    maintenance_type: joi_1.default.string().required(),
                    date: joi_1.default.date().iso().required(),
                    cost: joi_1.default.number().precision(2).positive().required(),
                    description: joi_1.default.string().allow(''),
                }),
            });
            // Validate the request against the defined schema.
            (0, base_1.validateSchema)(req[property], schema)
                .then((validationResult) => {
                fulfill(validationResult);
            })
                .catch((ex) => {
                reject(ex);
                return;
            });
        }
        catch (ex) {
            throw ex;
        }
    });
}
exports.__validatePost = __validatePost;
// Function to validate the request body for a PUT operation.
function __validatePut(req, body) {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for PUT request validation.
            const schema = joi_1.default.object({
                vehicle: joi_1.default.object({
                    vehicle_id: joi_1.default.number().required(),
                    make: joi_1.default.string().optional().allow(null, "", "undefined"),
                    model: joi_1.default.string().required(),
                    year: joi_1.default.number().required(),
                    color: joi_1.default.string().required(),
                    registration_plate: joi_1.default.string().required(),
                    start_date: joi_1.default.date().required(),
                    end_date: joi_1.default.date().allow(null),
                }),
                owner: joi_1.default.object({
                    owner_id: joi_1.default.number().required(),
                    first_name: joi_1.default.string().required(),
                    last_name: joi_1.default.string().required(),
                    email: joi_1.default.string().email().required(),
                    phone_number: joi_1.default.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
                }),
                insurance: joi_1.default.object({
                    insurance_company: joi_1.default.string().required(),
                    policy_number: joi_1.default.string().required(),
                    expiry_date: joi_1.default.date().iso().required(),
                }),
                maintenance: joi_1.default.object({
                    maintenance_type: joi_1.default.string().required(),
                    date: joi_1.default.date().iso().required(),
                    cost: joi_1.default.number().precision(2).positive().required(),
                    description: joi_1.default.string().allow(''),
                }),
            });
            // Validate the request against the defined schema.
            (0, base_1.validateSchema)(req[body], schema)
                .then((validationResult) => {
                fulfill(validationResult);
            })
                .catch((ex) => {
                reject(ex);
                return;
            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.__validatePut = __validatePut;
// Function to validate the request parameters for a GET operation.
function __validateGet(req, params) {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for GET request validation.
            const schema = joi_1.default.object({
                vehicleId: joi_1.default.number().required(),
            });
            // Validate the request against the defined schema.
            (0, base_1.validateSchema)(req[params], schema)
                .then((validationResult) => {
                fulfill(validationResult);
            })
                .catch((ex) => {
                reject(ex);
                return;
            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.__validateGet = __validateGet;
// Function to validate the request parameters for a DELETE operation.
function _validateDelete(req, params) {
    return new Promise((fulfill, reject) => {
        try {
            // Define the Joi schema for DELETE request validation.
            const schema = joi_1.default.object({
                vehicleId: joi_1.default.number().required(),
                ownerId: joi_1.default.number().required(),
            });
            // Validate the request against the defined schema.
            (0, base_1.validateSchema)(req[params], schema)
                .then((validationResult) => {
                fulfill(validationResult);
            })
                .catch((ex) => {
                reject(ex);
                return;
            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports._validateDelete = _validateDelete;
//# sourceMappingURL=vehicle-validation.js.map