const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuários e Projetos',
            version: '1.0.0',
            description: 'Documentação da API de Usuários e Projetos',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Caminhos para os arquivos de rota e controlador
};
 
const swaggerSpec = swaggerJsdoc(options);
 
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};