class Dashboard{

    constructor (page)
    {
      this.page = page;
      this.product_card = page.locator("//div[@class='card-body']");

    }
    async add_all_products()
    {   
        const count_add = await this.product_card.count();
        let total = 0;
       for (var i = 0; i< count_add; i++)
       {
          await this.product_card.nth(i).locator("//button[contains(text(), 'Add')]").click();
          var price = (await this.product_card.nth(i).textContent()).split('$')[1];
          total += parseFloat(price.split(' ')[1]);
       }
    return(total);
    }

}
module.exports = {Dashboard}