import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import firebase_admin.db
from time import ctime, time
from menuScraper import get_menu_items_from_time_and_hall

mealTimes = ["Breakfast", "Brunch", "Lunch", "Dinner", "LateNight"]
halls = ["Covel", "DeNeve", "FeastAtRieber", "BruinPlate"]

MEAL_TIME = "Brunch"
DESIGNATED_HALL = "BruinPlate"

cred =credentials.Certificate("/Users/matthewdev/CodingProjects/Hackathons/LAHacks2021/tasteBuds/web_scraping/tastebuds.json")

default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tastebuds-9f2ea-default-rtdb.firebaseio.com'
})
print(default_app.name)

for mealTime in mealTimes:
    for designatedHall in halls:
        MEAL_TIME = mealTime
        DESIGNATED_HALL = designatedHall
        menuItems = get_menu_items_from_time_and_hall(MEAL_TIME, DESIGNATED_HALL)
        #delete previous menu
        firebase_admin.db.reference("menus/" + DESIGNATED_HALL + "/" + MEAL_TIME).delete()
        #add new menu items

        for menuItem in menuItems:
            menuItem["itemName"]=  menuItem["itemName"].replace("/", "")
            firebase_admin.db.reference("menus/" + DESIGNATED_HALL + "/" + MEAL_TIME + "/"
            +menuItem["itemName"]).set(menuItem["recipeLink"])
        




