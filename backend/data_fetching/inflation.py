import requests
from bs4 import BeautifulSoup


class Inflation:
    def __init__(self, country="usa"):
        self.url = f"https://www.rateinflation.com/inflation-rate/{country}-inflation-rate/"
        print(self.url)

    def get_inflation_rate(self, year:int, month:int):
        response = requests.get(self.url)
        soup = BeautifulSoup(response.content, "lxml")
        date_div = soup.find_all('td', string=str(year))
        if date_div:
            inflation_div = date_div[0].find_next('td')
            for i in range(month-1):
                inflation_div = inflation_div.find_next('td')
            return float(inflation_div.text.replace("%", ""))
        return None
    
"""
# Example
inf = Inflation("usa")
# inflation year and month
print(inf.get_inflation_rate(2024, 9))
"""
 