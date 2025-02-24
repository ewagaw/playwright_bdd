const { Given, When, Then} = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const { order_page } = require('../xpath_variables/order_page.js');
const { shop_page } = require('../xpath_variables/shop_page.js');

Then('{string} will be present on order page', async function(product)
{
    await this.page.locator(shop_page.cart_button).click();
    await this.page.getByRole("button", {name : "Checkout"}).click();
    await expect(this.page.locator(order_page.title)).toBeVisible();
    await expect(this.page.locator("//div[@class='item__title' and contains(text(),'"+product+"')]")).toBeVisible();

});