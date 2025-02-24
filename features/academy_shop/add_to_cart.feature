Feature: Shop Page
  This feature will check display of elements on Shop Page
  
  Scenario: Checkout button on Shop Page
    Given I am logged in to shop
    When  I click 'Cart' button
    Then  Empty cart will be displayed
 
  Scenario Outline: Add product to a cart
    Given I am logged in to shop
    When  Click add on "<product>"
    Then  In cart "<product>" will be displayed
    Then  Price is displayed correctly for "<product>"
  Examples:
  |product |
  |ZARA    |
  |ADIDAS  |
  |IPHONE  |

 Scenario: Add all products from shop and check total price
    Given I'm logged to Shop Page as "ewga_test@op.pl" and "Abecadlo9876"
    When  I add all products to a cart 
    Then  Total price is display correctly in cart 