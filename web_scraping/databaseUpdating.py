import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import firebase_admin.db
from time import ctime, time
from menuScraper import get_menu_items_from_time_and_hall

mealTimes = ["Breakfast", "Brunch", "Lunch", "Dinner", "LateNight"]
halls = ["Covel", "DeNeve", "FeastAtRieber", "BruinPlate"]

cred =credentials.Certificate("/Users/matthewdev/CodingProjects/Hackathons/LAHacks2021/tasteBuds/web_scraping/tastebuds.json")

default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tastebuds-9f2ea-default-rtdb.firebaseio.com'
})
print(default_app.name)

def hall_path_switcher(pathName):
    translatedPath = {
        "Covel" : "Covel",
        "DeNeve" : "De Neve",
        "FeastAtRieber" : "Feast",
        "BruinPlate" : "BPlate"
    }
    return translatedPath.get(pathName, "ERROR")


for mealTime in mealTimes:
    for designatedHall in halls:
        MEAL_TIME = mealTime
        DESIGNATED_HALL = designatedHall
        menuItems = get_menu_items_from_time_and_hall(MEAL_TIME, DESIGNATED_HALL)
        #delete previous menu
        firebase_admin.db.reference("menus/" + hall_path_switcher(DESIGNATED_HALL) + "/" + MEAL_TIME).delete()
        #add new menu items

        for menuItem in menuItems:
            #taking care of invalid tokens
            for c in ["/", "-", "#", "$", "[", "]", "."]:
                menuItem["itemName"]=  menuItem["itemName"].replace(c, "")
            try:  
                path = firebase_admin.db.reference("menus/" +  hall_path_switcher(DESIGNATED_HALL) + "/" + MEAL_TIME + "/"
                +menuItem["itemName"])
                path.set(menuItem["recipeLink"])
            except ValueError:
                print("Invalid Path!")
            except TypeError:
                print("Invalid Path!")
            except firebase_admin.exceptions.FirebaseError:
                print("Invalid Path!")
       
            # firebase_admin.db.reference("menus/" + DESIGNATED_HALL + "/" + MEAL_TIME + "/"
            # +menuItem["itemName"]).set(menuItem["recipeLink"])
        




