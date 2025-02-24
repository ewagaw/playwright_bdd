const { login_shop } = require('../features/xpath_variables/login_shop.js');
const { shop_page } = require('../features/xpath_variables/shop_page.js');
const {expect} = require('@playwright/test');

class LoginPage{

    constructor (page)
    {
      this.page = page;
      this.username = page.locator(login_shop.username);
      this.passowrd = page.locator(login_shop.password);
      this.loginBtn = page.locator(login_shop.loginButton); 
      this.url = page.locator(login_shop.login_url);
    }
    async validLogin()
    {
        await this.page.goto(login_shop.login_url);
        await this.page.locator(login_shop.username).fill("ewga_test@op.pl");
        await this.page.locator(login_shop.password).fill("Abecadlo9876");
        await this.page.locator(login_shop.loginButton).click()
        //await this.page.waitForLoadState('networkidle');    
        await expect(this.page.locator(shop_page.title)).toBeVisible();

    }

}
module.exports = {LoginPage}