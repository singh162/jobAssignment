// This object represents the structure of a DELETE route for deleting a vehicle record.
const deleteRoute = {
  // Endpoint path with path parameters for vehicleId and ownerId.
  '/api/v1/{vehicleId}/{ownerId}': {
    delete: {
      tags: ['Vehicle'],
      summary: 'Delete a vehicle record',
      description: 'Endpoint to delete a specific vehicle record.',
      // Path parameters for the vehicleId and ownerId.
      parameters: [
        {
          in: 'path',
          name: 'vehicleId',
          required: true,
          description: 'ID of the vehicle to delete',
          schema: {
            type: 'integer',
          },
        },
        {
          in: 'path',
          name: 'ownerId',
          required: true,
          description: 'ID of the owner associated with the vehicle',
          schema: {
            type: 'integer',
          },
        },
      ],
      // Responses for successful and unsuccessful deletion operations.
      responses: {
        200: {
          description: 'Records deleted successfully',
          content: {
            'application/json': {
              schema: {
                // Reference to the schema for the DeleteResponse.
                $ref: '#/components/schemas/DeleteResponse',
              },
            },
          },
        },
        404: {
          description: 'Vehicle or owner not found',
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

// Exporting the deleteRoute object for use in other modules.
export { deleteRoute };
