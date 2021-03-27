import requests
from bs4 import BeautifulSoup
import json

def get_late_night_menu():
    url =  "http://web.archive.org/web/20200128181649/http://menu.dining.ucla.edu/Menus/DeNeveLateNight"

    menuItems = []
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id="main-content")
    container  = results.find("div", class_ = "swiper-container")
    wrapper = container.find("div", class_ = "swiper-wrapper")
    # print(wrapper)
    swiperSlides = wrapper.find_all("div", class_ = "swiper-slide")
    for swiperSlide in swiperSlides:
        # print(swiperSlide)
        menuBlocks = swiperSlide.find_all("div", class_ = "menu-block")
        for menuBlock in menuBlocks:
            # print(menuBlock)
            styleEntrees = menuBlock.find_all("div", class_ = "style-entree")
            for styleEntree in styleEntrees:
                # print(styleEntree)
                if styleEntree is None:
                    continue
                menuContainers = styleEntree.find_all("div", class_ = "menu-item")
                for menuContainer in menuContainers:
                    # print(menuContainer)
                    itemName = menuContainer.find("span", class_ = "menu-item-name")
                    # print(itemName)
                    menuItemContainer = itemName.find("a", class_ = "recipelink")
                    if menuItemContainer is None:
                        continue
                    menuItem = {
                        'itemName': menuItemContainer.text,
                        'recipeLink' : menuItemContainer['href']
                    }
                    menuItems.append(menuItem)
    return menuItems









# get_late_night_menu()



    


