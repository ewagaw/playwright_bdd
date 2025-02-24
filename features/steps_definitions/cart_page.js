
const { Given, When, Then } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');
const {cart_page} = require('../xpath_variables/cart_page.js');
const {shop_page} = require('../xpath_variables/shop_page.js');


When('I delete {string} from cart', async function (product_name) {
    await this.page.locator(shop_page.cart_button).click();

    var to_be_deleted = ('//h3[contains(text(),"'+product_name+'")]');
    await expect(this.page.locator(to_be_deleted)).toBeVisible();

    const prod_list = await this.page.locator(cart_page.products_list);
    const count_prod = await prod_list.count();
    var found = false;
    for (var i = 0; i < count_prod; i++)
    {
         var name = await prod_list.nth(i).locator("h3").textContent();
         
         if (name.includes(product_name))
         {
            this.price = (await prod_list.nth(i).locator(cart_page.price_in_cart).textContent()).split(' ')[1];
            await prod_list.nth(i).locator(this.page.locator(cart_page.delete_button)).click();
            found = true;
            break;
         }
    }
    expect(found).toBeTruthy();
    await expect(this.page.locator(to_be_deleted)).not.toBeVisible();
    const new_prod_list = await this.page.locator(cart_page.products_list);
    const new_count = await new_prod_list.count();
    expect(new_count).toEqual(count_prod-1); 
 });

 Then('Total price will be updated', async function()
{
    const new_total = parseFloat(this.total) - parseFloat(this.price); 
    var total_displayed = await this.page.locator(cart_page.total).nth(1).textContent();
    expect(parseFloat(total_displayed.slice(1))).toEqual(new_total);
});
