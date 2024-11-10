import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime, timedelta
import yfinance as yf

data = {
    "Apple": [1876.7],
    "Amazon": [2142.3],
    "AMD": [-921.49],
    "Coca-Cola": [806.06],
    "Bank of America": [101.99],  
    "Tesla": [1342.2],
        
}

# Convert to DataFrame
df = pd.DataFrame(data)

# Save the DataFrame to a JSON file
df.to_json('profit.json')

#print("DataFrame saved to data.json")