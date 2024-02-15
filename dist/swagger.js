"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const createRoute_1 = require("./routeSwager/createRoute");
const updateRoute_1 = require("./routeSwager/updateRoute");
const deleteRoute_1 = require("./routeSwager/deleteRoute");
const getAllRoute_1 = require("./routeSwager/getAllRoute");
const getOneRoute_1 = require("./routeSwager/getOneRoute");
const responseSchemas_1 = require("./schemas/responseSchemas");
const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Vehicle Administration API',
        description: 'API documentation for managing vehicle records'
    },
    servers: [
        {
            url: 'http://localhost:3000/',
            description: 'Local Server',
        },
    ],
    tags: [
        {
            name: 'Vehicle',
        },
    ],
    paths: Object.assign(Object.assign({ '/api/v1/': Object.assign(Object.assign(Object.assign({}, createRoute_1.createRoute), getAllRoute_1.getAllRoute), updateRoute_1.updateRoute) }, deleteRoute_1.deleteRoute), getOneRoute_1.getOneRoute),
    components: {
        schemas: {
            createUserBody: createRoute_1.createUserBody,
            updateUserBody: updateRoute_1.updateUserBody,
            ApiResponse: responseSchemas_1.ApiResponse,
            createResponse: responseSchemas_1.createResponse,
            DeleteResponse: responseSchemas_1.DeleteResponse,
            GetAllResponse: responseSchemas_1.GetAllResponse,
            GetOneResponse: responseSchemas_1.GetOneResponse,
            NotFoundResponse: responseSchemas_1.NotFoundResponse,
            UpdateResponse: responseSchemas_1.UpdateResponse,
        },
    },
};
exports.apiDocumentation = apiDocumentation;
//# sourceMappingURL=swagger.js.map