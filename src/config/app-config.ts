import * as dotenv from 'dotenv';
dotenv.config();
const env = process.env;

export const environment = {
    port: env.PORT ? env.PORT : 4500,
    baseUrl: env.BASEURL ? env.BASEURL : `https://localhost:8080`
}