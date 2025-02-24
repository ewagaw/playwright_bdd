let cart_page = {
    total : "//li[@class='totalRow']/span[@class='value']",
    products_list : "//div[@class='infoWrap']",
    delete_button : "//button[@class='btn btn-danger']",
    buy_now : "//button[contains(text(),'Buy Now')]",
    continue_shopping : "//button[contains(text(),'Continue Shopping')]",
    price_in_cart : "//div[@class='prodTotal cartSection']//p",
  
    
};
module.exports = {cart_page};