Feature: Login scenarios for Shop Page
  This feature include successfull snd failer logins to Shop Page
  
  Scenario: Successful login to Shop Page
    Given I'm on login page for "https://rahulshettyacademy.com/client/"
    When I login as "ewga_test@op.pl" and "Abecadlo9876"
    Then I should see "Automation Practice" page

  Scenario Outline: Login to Shop Page with incorrect password
    Given I'm on login page for "https://rahulshettyacademy.com/client/"
    When I login as "<login>" and "<password>"
    Then I should see error message

    Examples:
    |login                      | password       |
    |ewga_test@op.pl            | Abecadlo9      |
    |rahulshettyacademy@op.pl   | Abecadlo9876   |

  Scenario: Successful logout from Shop Page
    Given I am logged in to shop
    When  I click signout button
    Then  I'm logged out and back on login page
 
   Scenario Outline: Swich between cards
    Given I am logged in to shop
    When I click "<tab>"
    Then I'm redirected to "<page>"
    
    Examples:
    |tab      | page      |
    |myorders | No Orders |
    |cart     | My Cart   | 
