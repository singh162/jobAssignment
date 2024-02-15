"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaReturnError = exports.validateSchema = void 0;
function validateSchema(inputs, schema) {
    return new Promise(function (fulfill, reject) {
        try {
            let { error } = schema.validate(inputs);
            if (error) {
                if (error.details) {
                    reject({ "schemaError": true, "message": error.details[0].message.replace(/['"]+/g, '') });
                }
                else {
                    fulfill(false);
                }
            }
            else {
                fulfill(true);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.validateSchema = validateSchema;
function validateSchemaReturnError(inputs, schema) {
    return new Promise(function (fulfill, reject) {
        try {
            let { error } = schema.validate(inputs);
            if (error) {
                if (error.details) {
                    fulfill({ "schemaError": true, "message": error });
                }
                else {
                    fulfill(false);
                }
            }
            else {
                fulfill(true);
            }
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.validateSchemaReturnError = validateSchemaReturnError;
//# sourceMappingURL=base.js.map