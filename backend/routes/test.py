import json

file = "backend/data/normal/profit.json"
da= json.load(open(file, "r"))
data = {
        'categories': list(da.keys()),
        'amounts': list(da.values())
    }
for i in data['amounts']:
    print(i)
