import swedbankPay from './swedbankPay';

export class Contracts {
    private contracts = "";
    public getInstrumentBody = {};
    constructor() {
    }
    public async getContract(authorization: string, merchantId: string) {
        return swedbankPay.get(
            `${this.contracts}${merchantId}`,
            {
                headers: {
                    authorization: authorization
                }
            }
        );
    }
    public async putUpdateContract(authorization: string, merchantId: string, requestBody: any) {
        return swedbankPay.put(
            `${this.contracts}${merchantId}`,
            requestBody,
            {
                headers: {
                    authorization: authorization
                }
            }
        );
    }
    public async setService(service: string) {
        this.contracts = `/psp/${service}/contracts/`
    }
    public setRequestBody<T>(props: Partial<T> = {}) {
        const defaults = this.getInstrumentBody;
        return { ...defaults, ...props }
    }
    public preparePutRequestBody(contract: any, settings: object, service: string) {
        return {
            contract: {
                state: contract.state,
                comment: "proof of concept"
            },
            [service]: settings
        }
    }
}