const {test, expect} = require('@playwright/test');
const { type } = require('node:os');
//const dataset = JSON.parse(JSON.stringfy(require("../utils/")))
const username = "input#username";
const password = "[type='password']";
const loginButton = "input#signInBtn";
const documentLink = "[href*='documents-request']";
const { login_page } = require('./xpath_variables/login_page.js');

test('First test', async ({browser}) =>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://google.com");
}    

);

test.only('Browser context declaration', async ({page}) =>
    {
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      console.log(await page.title());
      await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
      await page.locator(login_page.username).fill("rahulshetty");
      await page.locator(login_page.password).fill("learning");
      await page.locator(login_page.loginButton).click();
      var error_locator = page.locator("[style='display: block;']");
      console.log(await error_locator.textContent());
      await expect(error_locator).toContainText("Incorrect");
      //await expect(error_locator).toBeVisible({timeout : 90000});
      await page.locator(login_page.username).fill("");
      await page.locator(login_page.username).fill("rahulshettyacademy");
      await page.locator(login_page.loginButton).click();
      const listofElements = page.locator(".card-body a");
      //console.log(await listofElements.first().textContent()); //bez tej linijki nie dziala??????
      //await page.waitForLoadState('networkidle');
      await listofElements.first().waitFor();
      console.log(await listofElements.nth(1).textContent());
      const Titles = await listofElements.allTextContents()
      console.log(Titles);

      for(let i = 0; i< Titles.length; i++)
      {
        console.log(Titles[i]);
        console.log(await listofElements.count());
      }
    } 
    
      ); 
test ('User radiobutton and dropdown list', async ({page}) =>
  {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator(username).fill("rahulshettyacademy");
    await page.locator(password).fill("learning");
    await page.locator("select.form-control").selectOption("consult");
    await page.locator("input[value='user']").click();
    await page.locator("#okayBtn").click();
    expect(page.locator("input[value='user']")).toBeChecked();
    console.log(await page.locator("input[value='user']").isChecked());
    await page.locator("//input[@id='terms']").check();
    await expect(page.locator(documentLink)).toHaveAttribute("class", "blinkingText");
    //await page.pause();
    await page.locator(loginButton).click();
  }  
);

test ('Handling child windows', async ({browser}) => 
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const [newPage] = await Promise.all(
    [context.waitForEvent('page'),
     page.locator(documentLink).click(),]
)
  const content_page = await newPage.locator(".red").textContent();
  const part_text = content_page.split("@");
  const domain_name = part_text[1].split(" ");

  await page.locator(username).fill(domain_name[0]);
  await page.pause();
}
);