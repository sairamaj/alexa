export class Configuration{
    baseUrl: string
    adminUrl: string

    constructor(){
        if (this.isDashboardDev()) {
            this.baseUrl = 'https://pitangui.amazon.com';
        } else {
            this.baseUrl = ''
        }

        this.adminUrl = this.baseUrl + '/api/admin/'        
    }

    getAccountLinkingUrl() : string{
        return this.adminUrl + 'accountlinking';
    }

    getTokensUrl() : string{
        return this.adminUrl + 'tokens';
    }

    getTokenDetailsUrl(token:string) : string {
        return this.adminUrl + 'tokens/' + token;
    }

    isDashboardDev(): boolean {
        return true
    }
}