import  { environment } from './config/app-config';
import express from 'express';
import cors from 'cors';
import { Service } from './controller/services';
const app = express();
const corsOptions = {
    origin: true,
    credentials: true,
    methods: ['PATCH', 'GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))
const service = new Service();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(environment.port, () => {
    console.log(`Listening on port `, environment.port);
});

app.get("/contracts/:service/:merchantId", async (req, res) => {
    try {
        const authorization = req.headers.authorization ? req.headers.authorization : "";
        const response = await service.getContract(
            req.params.service, 
            req.params.merchantId,
            authorization
        );
        return res.send(response.data);
    } catch (error: any) {
        res.status(error.response.status);
        res.send({
            "Error": error.message
        });
    }
    return res.end();
});
app.get("/contracts/:service/:subservice/:merchantId", async (req, res) => {
    try {
        const authorization = req.headers.authorization ? req.headers.authorization : "";
        const response = await service.getContract(
            req.params.service, 
            `${req.params.merchantId}/${req.params.subservice}`,
            authorization
        );
        return res.send(response.data);
    } catch (error: any) {
        res.status(error.response.status);
        res.send({
            "Error": error.message
        });
    }
    return res.end();
});
app.patch("/contracts/:service/:merchantId", async (req, res) => {
    try {
        const authorization = req.headers.authorization ? req.headers.authorization : "";
        const requestBody = req.body;
        const response = await service.updateContract(
            req.params.service, 
            req.params.merchantId,
            authorization, 
            requestBody
        );
        res.status(response.status);
        return res.send(response.data);
    } catch (error: any) {
        res.status(error.response.status);
        res.send({
            "Error": error.message
        });
    }
    return res.end();
});
app.patch("/contracts/:service/:subservice/:merchantId", async (req, res) => {
    try {
        const authorization = req.headers.authorization ? req.headers.authorization : "";
        const requestBody = req.body;
        const response = await service.updateContract(
            req.params.service, 
            `${req.params.merchantId}/${req.params.subservice}`,
            authorization, 
            requestBody
        );
        res.status(response.status);
        return res.send(response.data);
    } catch (error: any) {
        res.status(error.response.status);
        res.send({
            "Error": error.message
        });
    }
    return res.end();
});