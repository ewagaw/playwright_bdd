Feature: Cart actions available
  This feature will check cart actions 

  Scenario Outline: Item can be deleted from list
    Given  I have all products in cart
    When   I delete "<product>" from cart 
    Then   Total price will be updated
  Examples:
  |product |
  |ZARA    |
  |ADIDAS  |
  |IPHONE  |
  
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

 Scenario: Rediraction to place order page
    Given I have all products in cart
    When  In cart "<product>" will be displayed
    Then  "<product>" will be present on order page
  Examples:
  |product |
  |ZARA    |
  |ADIDAS  |
  |IPHONE  |


