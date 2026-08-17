import { BasePage } from "./BasePage";

export class ProductPage extends BasePage{
    constructor(page){
        super(page);
        this.products = page.locator(
            '[data-test = "inventory-item"]'
        );

        this.productNames = page.locator(
            '[data-test ="inventory-item-name"]'
        );
        this.productPrices = page.locator(
            '[data-test = "inventory-item-price"]'
        );
        this.sortDropdown = page.locator(
            '[data-test="product-sort-container"]'
        );
    }

     async gotoProducts() {
        await this.goto("/inventory.html");
     }
     
     async gotoProductCount(){
        return await this.products.count
     }

     async getProductNames() {
        return await this.productNames.allTextContents();
     }

      async getProductPrices() {
        return await this.productPrices.allTextContents();

        await this.sortDropdown.waitFor({
            state: "visible"
        });
      }

       async sortBy(option) {
        
          await this.sortDropdown.selectOption(option);

       }

       async selectProduct(productName) {
         await this.page
            .getByText(productName, { exact: true })
            .click();
       }

       async addProductToCart(productName) {
        const product = this.products.filter({
            hasText: productName
        });

        await product
            .getByRole("button", {
                name: /Add to cart/
            })
            .click();
       }



}