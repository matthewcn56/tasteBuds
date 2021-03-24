import requests
from bs4 import BeautifulSoup
import json

# MEAL_TIME = "Brunch"
# REQUESTED_HALL = "BruinPlate"


def get_menu_items_from_time_and_hall(meal_time, desired_hall):
    url = 'https://web.archive.org/web/http://menu.dining.ucla.edu/Menus/' + desired_hall + '/Today'
    if desired_hall == "BruinPlate":
        url = "https://web.archive.org/web/20200229052529/http://menu.dining.ucla.edu/Menus/BruinPlate/Today"

    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id="main-content")
    items = results.find_all("div", class_="menu-block")
    MEAL_TIME = meal_time

    hallMenuItems = []
    for item in items:
        currentMeal = item.find("h3", class_="col-header")
        if currentMeal.text == MEAL_TIME:
                menuBars=item.find_all("ul", class_ = "sect-list")
                for menuBar in menuBars:
                    itemSections = menuBar.find_all("li", class_ = "sect-item")
                    for itemSection in itemSections:
                        menuSubsections = itemSection.find_all("ul", class_="item-list")
                        for menuSubsection in menuSubsections:
                            menuLinks = menuSubsection.find_all("li", class_="menu-item")
                            for menuLink in menuLinks:
                                menuSubLinks = menuLink.find_all("span", class_="tooltip-target-wrapper")
                                for menuSubLink in menuSubLinks:
                                    menuItems = menuSubLink.find_all("a", class_="recipelink")
                                    for menuItem in menuItems:
                                        hallMenuItem = {
                                            'itemName' : menuItem.text,
                                            'recipeLink' : menuItem['href']
                                        }
                                        hallMenuItems.append(hallMenuItem)
                                        
    return hallMenuItems


# items = get_menu_items_from_time_and_hall(MEAL_TIME, REQUESTED_HALL)
# returnValue = json.dumps(items)
# #return the returnValue which is a JSON Object

# #For Testing Purposes
# tester = json.loads(returnValue)
# for test in tester:
#     print (test)