"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneRoute = void 0;
// This object represents the structure of a GET route for retrieving a specific vehicle record.
const getOneRoute = {
    // Endpoint path with path parameter for vehicleId.
    '/api/v1/{vehicleId}': {
        get: {
            tags: ['Vehicle'],
            summary: 'Get a specific vehicle record',
            description: 'Endpoint to retrieve information about a specific vehicle record.',
            // Path parameter for the vehicleId.
            parameters: [
                {
                    in: 'path',
                    name: 'vehicleId',
                    required: true,
                    description: 'ID of the vehicle to retrieve',
                    schema: {
                        type: 'integer',
                    },
                },
            ],
            // Responses for successful and unsuccessful retrieval operations.
            responses: {
                200: {
                    description: 'Successful operation',
                    content: {
                        'application/json': {
                            schema: {
                                // Reference to the schema for the GetOneResponse.
                                $ref: '#/components/schemas/GetOneResponse',
                            },
                        },
                    },
                },
                404: {
                    description: 'Vehicle not found',
                    content: {
                        'application/json': {
                            schema: {
                                // Reference to the schema for the NotFoundResponse.
                                $ref: '#/components/schemas/NotFoundResponse',
                            },
                        },
                    },
                },
            },
        },
    },
};
exports.getOneRoute = getOneRoute;
//# sourceMappingURL=getOneRoute.js.map