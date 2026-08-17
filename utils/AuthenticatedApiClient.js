import { ApiClient } from "./ApiClient";

export class AuthenticatedApiClient extends ApiClient {

    constructor(request, token) {
        super(request);
        this.token = token;
    }

    async getProfile() {

        return await this.request.get(
            `${this.baseURL}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        );
    }

}