import requests
from bs4 import BeautifulSoup

url = 'https://www.monster.com/jobs/search/?q=Software-Developer&where=Australia'
page = requests.get(url)

text = page.content

soup = BeautifulSoup(page.content, 'html.parser')
