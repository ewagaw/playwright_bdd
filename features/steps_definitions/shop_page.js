const { Given, When, Then, And } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');
const { shop_page } = require('../xpath_variables/shop_page.js');
const { login_shop } = require('../xpath_variables/login_shop.js');
const {cart_page} = require('../xpath_variables/cart_page.js');

const {LoginPage} = require('../../page_objects/login_page.js');
const { Dashboard } = require('../../page_objects/dashboard.js');

Given("I'm logged to Shop Page as {string} and {string}", {timeout : 100*1000}, async function (username, password) {
    const browser = await playwright.chromium.launch({headless : false});
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(login_shop.login_url);
    await this.page.locator(login_shop.username).fill(username);
    await this.page.locator(login_shop.password).fill(password);
    await this.page.locator(login_shop.loginButton).click()
    await expect(this.page.locator(shop_page.title)).toBeVisible();
  });

  When("I click 'Cart' button", async function() {
    await this.page.locator(shop_page.cart_button).click();    
    await this.page.waitForLoadState('networkidle'); 
  }); 

  Then("Empty cart will be displayed", async function(){
    await expect(this.page.getByText("No Products in Your Cart !")).toBeVisible()
  });

  When("Click add on {string}", async function(product_name)
{
  var name_xpath = shop_page.product_to_add.replace("${product_name}", product_name);
  var price_xpath = shop_page.product_price.replace("${product_name}", product_name);
  this.full_name = await this.page.locator(name_xpath).textContent();
  this.price = await this.page.locator(price_xpath).textContent();
  var add_xpath = shop_page.add_product.replace("${product_name}", product_name);
  await this.page.locator(add_xpath).click();
  await expect(this.page.locator(shop_page.cart_label)).toContainText('1');
});

  Then("In cart {string} will be displayed", async function(product_name)
{
    await this.page.locator(shop_page.cart_button).click();
    var path = ('//h3[contains(text(),"'+product_name+'")]');
    await expect(this.page.locator(path)).toBeVisible();
});
      
 Then("Price is displayed correctly for {string}", async function (product_name){
    const prod_list = await this.page.locator(cart_page.products_list);
    const count_prod = await prod_list.count();
    for (var i=0; i<count_prod; i++)
    {
         if (await prod_list.nth(i).locator("h3").textContent() === this.full_name)
         {
           var displayed_price = await prod_list.nth(i).locator("//div[@class='prodTotal cartSection']").textContent();
           expect(displayed_price).toEqual(this.price);            
           var displayed_MRP = await prod_list.nth(i).locator("//div[@class='cartSection']").textContent();
           expect(displayed_MRP).toContain('MRP '+ this.price);
         }
    }

 });

 When("I add all products to a cart", async function()
 {
    await this.page.waitForLoadState('networkidle');
    const shop = new Dashboard(this.page);
    this.total = await shop.add_all_products();
    console.log(this.total);
 });
 
Then('Total price is display correctly in cart', async function()
{
    await this.page.locator(shop_page.cart_button).click();
    var total_displayed = await this.page.locator(cart_page.total).nth(1).textContent();
    expect(parseFloat(total_displayed.slice(1))).toEqual(this.total);
});

Given('I am logged in to shop', async function()
{
    const browser = await playwright.chromium.launch({headless : false});
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    const LogPage = new LoginPage(this.page);
    LogPage.validLogin();
});

Given('I have all products in cart', {timeout : 100*1000}, async function()
{
    const browser = await playwright.chromium.launch({headless : false});
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    const LogPage = new LoginPage(this.page);
    await LogPage.validLogin();
    const shop = new Dashboard(this.page);
    this.total = await shop.add_all_products();
    console.log(this.total);

});