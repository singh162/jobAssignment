"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserBody = exports.createRoute = void 0;
// This object represents the structure of a POST route for adding a new vehicle record.
const createRoute = {
    post: {
        tags: ['Vehicle'],
        summary: 'Add a new vehicle record test',
        description: 'Endpoint to add a new vehicle record.',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        // Reference to the schema for the request body.
                        $ref: '#/components/schemas/createUserBody',
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Successful operation',
                content: {
                    'application/json': {
                        schema: {
                            // Reference to the schema for the createResponse in case of a successful operation.
                            $ref: '#/components/schemas/createResponse',
                        },
                    },
                },
            },
            '500': {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: {
                            // Reference to the schema for the ApiResponse in case of internal server error.
                            $ref: '#/components/schemas/ApiResponse',
                        },
                    },
                },
            },
        },
    },
};
exports.createRoute = createRoute;
// This object represents the structure of the request body for adding a new vehicle record.
const createUserBody = {
    type: 'object',
    properties: {
        // Schema for the 'vehicle' object within the request body.
        vehicle: {
            type: 'object',
            properties: {
                make: { type: 'string', example: 'Toyota4' },
                model: { type: 'string', example: 'Camry4' },
                year: { type: 'integer', example: 2022 },
                color: { type: 'string', example: 'Red' },
                registration_plate: { type: 'string', example: 'ABC123' },
                start_date: { type: 'string', format: 'date-time', example: '2024-02-30 00:33:33' },
                end_date: { type: 'string', format: 'date-time', example: '2024-02-30 00:33:33' },
            },
            required: ['make', 'model', 'year', 'color', 'registration_plate', 'start_date', 'end_date'],
        },
        // Schema for the 'owner' object within the request body.
        owner: {
            type: 'object',
            properties: {
                first_name: { type: 'string', example: 'Updated First Name' },
                last_name: { type: 'string', example: 'Updated Last Name' },
                email: { type: 'string', format: 'email' },
                phone_number: { type: 'string', example: '987-654-3210' },
            },
            required: ['first_name', 'last_name', 'email', 'phone_number'],
        },
        // Schema for the 'maintenance' object within the request body.
        maintenance: {
            type: 'object',
            properties: {
                maintenance_type: { type: 'string', example: 'Oil Change' },
                date: { type: 'string', format: 'date-time', example: '2024-02-30 00:33:33' },
                cost: { type: 'number', example: 50.00 },
                description: { type: 'string', example: 'Updated maintenance description' },
            },
            required: ['maintenance_type', 'date', 'cost', 'description'],
        },
        // Schema for the 'insurance' object within the request body.
        insurance: {
            type: 'object',
            properties: {
                insurance_company: { type: 'string', example: 'Updated Insurance Company' },
                policy_number: { type: 'string', example: 'Updated Policy Number' },
                expiry_date: { type: 'string', format: 'date-time', example: '2024-02-29' },
            },
            required: ['insurance_company', 'policy_number', 'expiry_date'],
        },
    },
    // Required properties for the overall request body.
    required: ['vehicle', 'owner'],
};
exports.createUserBody = createUserBody;
//# sourceMappingURL=createRoute.js.map