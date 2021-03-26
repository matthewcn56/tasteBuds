import requests
from bs4 import BeautifulSoup
import json

def get_hall_hours_from_meal_time_and_hall(meal_time, desired_hall):
    url = "https://web.archive.org/web/20200128183422/http://menu.dining.ucla.edu/hours"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id="main-content")
    tables = results.find_all("table", class_ = "hours-table")
    for table in tables:
        tableBody = table.find("tbody")
        tableRows= tableBody.find_all("tr")
        for tableRow in tableRows:
            tableHead= tableRow.find("td", class_ = "hours-head")

            tableLocation = tableHead.find("span", class_ = "hours-location").text
            if (tableLocation == desired_hall):
                openTimes = tableRow.find("td", class_ = "hours-open " + meal_time)
                if not openTimes:
                    return ""
                openTimesBar = openTimes.find("span", class_ = "hours-range")
                if not openTimesBar:
                    return ""
                return openTimesBar.text

print(get_hall_hours_from_meal_time_and_hall("Breakfast", "De Neve"))


                


            






