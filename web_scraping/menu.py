import requests
from bs4 import BeautifulSoup

url = 'https://web.archive.org/web/20200219143919/http://menu.dining.ucla.edu/Menus/Today'
page = requests.get(url)
REQUESTED_HALL = "Bruin Plate"
text = page.content

soup = BeautifulSoup(page.content, 'html.parser')

results = soup.find(id="main-content")

items = results.find_all("div", class_="menu-block half-col")

for item in items:
     hall = item.find("h3", class_="col-header")
     hallName = hall.text
     if hall.text == REQUESTED_HALL:
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
                                    print(menuItem.text) #SHOULD BE STORED IN A VALUE TO BE RETURNED IN API
                                    print(menuItem['href'])
                                    #TODO: Create JSON object with both Text & Link that gets passed in to front-end
                