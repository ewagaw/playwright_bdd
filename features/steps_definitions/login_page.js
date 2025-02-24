
const { Given, When, Then } = require('@cucumber/cucumber');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');
const {login_shop} = require('../xpath_variables/login_shop.js')


Given("I'm on login page for {string}", async function (url) {
    const browser = await playwright.chromium.launch({headless : false});
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    await this.page.goto(url);
  });

When('I login as {string} and {string}', {timeout : 100*1000}, async function (username, password) {
    
   await this.page.locator(login_shop.username).fill(username);
   await this.page.locator(login_shop.password).fill(password);
   this.page.locator(login_shop.loginButton).click()
   await this.page.waitForLoadState('networkidle');  
});

Then('I should see {string} page', async function (title) {
   var path = '//p[contains(text(),'+title+')])';
    expect(this.page.locator(path)).toBeVisible();
});

Then ('I should see error message', async function (){
     expect(this.page.locator(login_shop.error_message)).toBeVisible();
});

When('I click signout button', async function(){

    await this.page.locator(login_shop.signoutButton).click();

});

Then("I'm logged out and back on login page", async function(){

    await expect(this.page.locator(login_shop.title)).toBeVisible();
    await expect(this.page.locator(login_shop.loginButton)).toBeVisible();
});

When('I click {string}', async function (tab){
   await this.page.waitForLoadState('networkidle');
   await this.page.locator('//button[@routerlink="/dashboard/'+tab+'"]').click();

});

Then("I'm redirected to {string}", async function(tab_page){
   await this.page.waitForLoadState('networkidle');
   await expect(this.page.getByText(tab_page)).toBeVisible();
});