#This Script is Not Used In Production, we had to use it to quickly emulate adding users into a dining hall at once for
#demonstration purposes, since it is physically impossible to demosntrate using our Hardware during Covid.
#We used the same logic as the hardware for implementing Activity Level of the dining hall however, to make it as true to 
#production as possible

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import firebase_admin.db
from time import ctime, time
from menuScraper import get_menu_items_from_time_and_hall

mealTimes = ["Breakfast", "Brunch", "Lunch", "Dinner", "LateNight"]
halls = ["BruinPlate"]
#  "DeNeve", "FeastAtRieber", "BruinPlate", "Covel"
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

for designatedHall in halls:
    for i in range(50):
        activityPath = firebase_admin.db.reference("activityLevels/BPlate")
        if i is 0:
            activityPath.set("Low")
        if i is 14:
            activityPath.set("Medium")
        if i is 29:
            activityPath.set("High")
        
        firebase_admin.db.reference("capacities/" + hall_path_switcher(designatedHall)).push("anonymous")


# for mealTime in mealTimes:
#     for designatedHall in halls:
#         MEAL_TIME = mealTime
#         DESIGNATED_HALL = designatedHall
#         menuItems = get_menu_items_from_time_and_hall(MEAL_TIME, DESIGNATED_HALL)
#         #delete previous menu
#         firebase_admin.db.reference("menus/" + hall_path_switcher(DESIGNATED_HALL) + "/" + MEAL_TIME).delete()
#         #add new menu items

#         for menuItem in menuItems:
#             #taking care of invalid tokens
#             for c in ["/", "-", "#", "$", "[", "]", "."]:
#                 menuItem["itemName"]=  menuItem["itemName"].replace(c, "")
#             try:  
#                 path = firebase_admin.db.reference("menus/" +  hall_path_switcher(DESIGNATED_HALL) + "/" + MEAL_TIME + "/"
#                 +menuItem["itemName"])
#                 path.set(menuItem["recipeLink"])
#             except ValueError:
#                 print("Invalid Path!")
#             except TypeError:
#                 print("Invalid Path!")
#             except firebase_admin.exceptions.FirebaseError:
#                 print("Invalid Path!")
       
#             # firebase_admin.db.reference("menus/" + DESIGNATED_HALL + "/" + MEAL_TIME + "/"
#             # +menuItem["itemName"]).set(menuItem["recipeLink"])
        




