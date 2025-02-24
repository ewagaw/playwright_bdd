let shop_page = {
    title : "//p[contains(text(),'Automation Practice')]",
    cart_button : "//button[@routerlink='/dashboard/cart']",
    product_to_add : "//b[contains(text(),'${product_name}')]",
    cart_label : "//button[@routerlink='/dashboard/cart']//child::label[1]",
    product_price : "//b[contains(text(),'${product_name}')]//following::div[contains(text(),'$')][1]",
    add_product : "//b[contains(text(),'${product_name}')]//following::button[contains(text(),'Add')][1]"
};
module.exports = {shop_page};

