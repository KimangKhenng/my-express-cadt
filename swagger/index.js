const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const setupSwagger = (app) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'CADT API',
                version: '1.0.0',
            },
        },
        apis: ['./routes/*.js'],
    };

    const openapiSpecification = swaggerJsdoc(options)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
}

module.exports = { setupSwagger }