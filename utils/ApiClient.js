export class ApiClient {

    constructor(request) {
        this.request = request;
         this.baseURL = process.env.API_BASE_URL;
    }

    // async getProducts() {

    //     return await this.request.get(
    //         "/api/products"
    //     );
    // }

    async login(username, password) {

        return await this.request.post(
            `${this.baseURL}/auth/login`,
            {
                data: {
                    username,
                    password
                }
            }
        );
    }

    async getProfile(token) {

        return await this.request.get(
            `${this.baseURL}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }

     async getProducts() {

        return await this.request.get(
            `${this.baseURL}/products`
        );
    }

    async getProduct(id) {

        return await this.request.get(
            `${this.baseURL}/products/${id}`
        );
    }

    async createProduct(product) {

    return await this.request.post(
        `${this.baseURL}/products/add`,
        {
            data: product
        }
    );
  }

    async updateProduct(id, product) {

        return await this.request.put(
            `${this.baseURL}/products/${id}`,
            {
                data: product
            }
        );
    }

async deleteProduct(id) {

    return await this.request.delete(
        `${this.baseURL}/products/${id}`
    );
}

}