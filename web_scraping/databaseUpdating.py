import base64
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import firebase_admin.db
from time import ctime, time
from menuScraper import get_menu_items_from_time_and_hall
from hallHoursScraper import get_hall_hours_from_meal_time_and_hall
from lateNightMenuScraper import get_late_night_menu


def hello_pubsub(event, context):
    mealTimes = ["Breakfast", "Brunch", "Lunch", "Dinner", "Late Night"]
    halls = ["Covel", "DeNeve", "FeastAtRieber", "BruinPlate"]
    cred = credentials.Certificate({
        'type' : os.environ['TYPE'],
        'project_id' : os.environ['PROJECT_ID'],
        'private_key_id' :  os.environ['PRIVATE_KEY_ID'],
        'private_key' : os.environ['PRIVATE_KEY'].replace('\\n', '\n'),
        'client_email' : os.environ['CLIENT_EMAIL']  ,
        'client_id' : os.environ['CLIENT_ID'],
        'auth_uri' : os.environ['AUTH_URI'],
        'token_uri' : os.environ['TOKEN_URI'] ,
        'auth_provider_x509_cert_url': os.environ['auth_provider_x509_cert_url'] ,
        'client_x509_cert_url' : os.environ['client_x509_cert_url'],
    })
    default_app = firebase_admin.initialize_app(cred, {
        'databaseURL' : os.environ['DATABASE_URL']
    })

    def hall_path_switcher(pathName):
        translatedPath = {
            "Covel" : "Covel",
            "DeNeve" : "De Neve",
            "FeastAtRieber" : "Feast",
            "BruinPlate" : "BPlate",
            "LateNight" : "Late Night"
        }
        return translatedPath.get(pathName, "ERROR")

    def hours_path_switcher(pathName):
        translatedPath = {
            "Covel" : "Covel",
            "DeNeve" : "De Neve",
            "FeastAtRieber" : "FEAST at Rieber",
            "BruinPlate" : "Bruin Plate",
            "LateNight": "Late Night"
        }
        return translatedPath.get(pathName, "ERROR")

    print(default_app.name)

    for mealTime in mealTimes:
        for designatedHall in halls:
            MEAL_TIME = mealTime
            DESIGNATED_HALL = designatedHall
            menuItems = get_menu_items_from_time_and_hall(MEAL_TIME, DESIGNATED_HALL)
            openHours = get_hall_hours_from_meal_time_and_hall(MEAL_TIME, hours_path_switcher(DESIGNATED_HALL))

            #Late Night at De Neve is Special
            if ( MEAL_TIME ==  "LateNight" and DESIGNATED_HALL == "DeNeve" ):
                menuItems = get_late_night_menu()
                openHours = get_hall_hours_from_meal_time_and_hall("Late Night", "De Neve")


            # #delete previous menu
            firebase_admin.db.reference("menus/" + hall_path_switcher(DESIGNATED_HALL) + "/" + MEAL_TIME).delete()
            #delete previous hours
            firebase_admin.db.reference("hours/" + hall_path_switcher(DESIGNATED_HALL) + "/" +MEAL_TIME).delete()

            #update the hours
            hoursPath = firebase_admin.db.reference("hours/" + hall_path_switcher(DESIGNATED_HALL) +"/" + MEAL_TIME)
            if openHours is None:
                hoursPath.delete()
            else:
                hoursPath.set(openHours)
            if hoursPath.get() == "":
                hoursPath.delete()

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
            



    # """Triggered from a message on a Cloud Pub/Sub topic.
    # Args:
    #      event (dict): Event payload.
    #      context (google.cloud.functions.Context): Metadata for the event.
    # """
    # pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    # print(pubsub_message)