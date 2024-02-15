"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBody = exports.updateRoute = void 0;
// This object represents the structure of a PUT route for updating a vehicle record.
const updateRoute = {
    put: {
        tags: ['Vehicle'],
        summary: 'Update a vehicle record',
        description: 'Endpoint to update an existing vehicle record.',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        // Reference to the schema for the updateUserBody.
                        $ref: '#/components/schemas/updateUserBody',
                    },
                },
            },
        },
        // Responses for successful and unsuccessful update operations.
        responses: {
            200: {
                description: 'Records updated successfully',
                content: {
                    'application/json': {
                        schema: {
                            // Reference to the schema for the UpdateResponse.
                            $ref: '#/components/schemas/UpdateResponse',
                        },
                    },
                },
            },
            500: {
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
exports.updateRoute = updateRoute;
// This object represents the structure of the request body for updating a vehicle record.
const updateUserBody = {
    type: 'object',
    properties: {
        // Schema for the 'vehicle' object within the request body.
        vehicle: {
            type: 'object',
            properties: {
                vehicle_id: { type: 'integer', example: 3 },
                make: { type: 'string', example: 'Toyota4' },
                model: { type: 'string', example: 'Camry4' },
                year: { type: 'integer', example: 2022 },
                color: { type: 'string', example: 'Red' },
                registration_plate: { type: 'string', example: 'ABC123' },
                start_date: { type: 'string', format: 'date-time', example: '2024-02-13' },
                end_date: { type: 'string', format: 'date-time', example: '2024-02-27' },
            },
            required: ['make', 'model', 'year', 'color', 'registration_plate', 'start_date', 'end_date'],
        },
        // Schema for the 'owner' object within the request body.
        owner: {
            type: 'object',
            properties: {
                owner_id: { type: 'integer', example: 2 },
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
                date: { type: 'string', format: 'date-time', example: '2024-02-13T18:30:00.000Z' },
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
                expiry_date: { type: 'string', format: 'date-time', example: '2024-02-29T18:30:00.000Z' },
            },
            required: ['insurance_company', 'policy_number', 'expiry_date'],
        },
    },
    // Required properties for the overall request body.
    required: ['vehicle', 'owner'],
};
exports.updateUserBody = updateUserBody;
//# sourceMappingURL=updateRoute.js.map