import swedbankPay from './swedbankPay';

export class Contracts {
    private contracts = "";
    public state: state  = state.Configured;
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
    public setInstrumentSettings<T>(settings: Partial<T> = {}) {
        return this.mergeObjects(this.getInstrumentBody, settings);
    }
    public setContractSettings<T>(settings: Partial<T>) {
        const defaults = {
            state: this.state,
            comment: "editContract update: auto comment"
        }
        return this.mergeObjects(defaults, settings)
    }
    public preparePutRequestBody(contract: any, settings: object, service: string) {
        return {
            contract: contract,
            [service]: settings
        }
    }
    private mergeObjects<T>(defaults: T, props: Partial<T>) {
        return { ...defaults, ...props }
    }
}
enum state {
    Configured = 'Configured',
    Active = 'Active',
    Deactivated = 'Deactivated',
    Deleted = 'Deleted'
}