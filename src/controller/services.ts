import { Contracts } from './API';

export class Service {
    private readonly Contracts = new Contracts();

    public async getContract(
        service: string,
        merchantId: string,
        authorization: string
    ) {
        await this.Contracts.setService(service);
        const response = await this.Contracts.getContract(authorization, merchantId);
        return response;
    }
    public async updateContract(
        service: string,
        merchantId: string,
        authorization: string,
        requestBody: any
    ) {
        try {
            await this.Contracts.setService(service);
            const getResponse = await this.Contracts.getContract(authorization, merchantId);
            const responseBody = this.convertToLowerCase(getResponse.data);
            this.storeContractData(responseBody, service);
            const updateRequestBody = this.mergeInputsAndCreatePutBody(requestBody, service);
            const response = await this.Contracts.putUpdateContract(authorization, merchantId, updateRequestBody);
            return response;
        } catch (error) {
            return error.response
        }
    }
    private convertToLowerCase(object) {
        return object = Object.keys(object).reduce((c, k) => (
            c[k.toLowerCase().trim()] = object[k], c), {}
        )
    }
    private storeContractData(responseBody, service) {
        const instrument = responseBody[service.toLowerCase()];
        const state = responseBody.contract.state;
        this.Contracts.getInstrumentBody = instrument;
        this.Contracts.state = state;
    }
    private mergeInputsAndCreatePutBody(requestBody, service: string) {
        const contractInput = this.Contracts.setContractSettings(requestBody.contract);
        const settingsInput = this.Contracts.setInstrumentSettings(requestBody[service.toLowerCase()]);
        return this.Contracts.preparePutRequestBody(contractInput, settingsInput, service);
    }
}