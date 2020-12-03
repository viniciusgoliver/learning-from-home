import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('App Learning from Home')
    .setDescription('Documentação de APIS')
    .setVersion('1.0')    
    .addBearerAuth(
        { 
            type: 'http', 
            scheme: 'bearer', 
            bearerFormat: 'JWT',
            in: 'header'
        },
        'access-token',
    )
    .build();
