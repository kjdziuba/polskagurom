import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Check if NLTK resources are already downloaded, and if not, download them
def download_nltk_resources():
    try:
        # Check if the resources are already downloaded
        nltk.data.find('tokenizers/punkt_tab')
        nltk.data.find('corpora/stopwords')
        nltk.data.find('corpora/wordnet')
    except LookupError:
        # If the resources are not found, download them
        nltk.download('punkt_tab', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('wordnet', quiet=True)

# Call the download function to ensure the necessary resources are available
download_nltk_resources()

# Initialize stopwords and lemmatizer
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
lemmatizer.lemmatize('running', pos='v')

# Function for text preprocessing
def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    
    # Tokenize the text
    words = word_tokenize(text)
    
    # Remove stopwords and non-alphabetic tokens, then lemmatize
    processed_words = [
        lemmatizer.lemmatize(word, pos='n') for word in words
        if word.isalpha() and word not in stop_words
    ]
    
    # Return the processed words as a single string
    return ' '.join(processed_words)

# Function to categorize using both nltk and regular expressions
def assign_category(title):
    # Preprocess the title
    processed_title = preprocess_text(title)
    # Use regular expressions to define patterns for each category
    if re.search(r'\b(coffee|starbucks|cafe|dinig|restaurant)\b', processed_title):
        return 'Food & Drinks'
    elif re.search(r'\b(grocery|walmart|supermarket)\b', processed_title):
        return 'Groceries'
    elif re.search(r'\b(uber|taxi|lyft|car|transport|bus|train|fuel|travel)\b', processed_title):
        return 'Transport'
    elif re.search(r'\b(netflix|spotify|subscription|ticket|book|gaming|electronics|camping|bookstore|art|tech)\b', processed_title):
        return 'Entertainment'
    elif re.search(r'\b(rent|mortgage|property|lease)\b', processed_title):
        return 'Rent'
    elif re.search(r'\b(water|electricity|utilities|bill|phone|mobile)\b', processed_title):
        return 'Utilities'
    elif re.search(r'\b(doctor|hospital|pharmacy|health|insurance|medication|care)\b', processed_title):
        return 'Health'
    elif re.search(r'\b(sport|sporting|sport|fitness|gym|workout)\b', processed_title):
        return 'Sport & Fitness'
    elif re.search(r'\b(home|furniture|decoration|garden|tools|hardware|diy|cooking|kitchen|bathroom|gardening|bedroom)\b', processed_title):
        return 'Home & Garden'
    elif re.search(r'\b(zara|nike|adidas|fashion|shoe|clothing|jacket|t-shirt)\b', processed_title):
        return 'Clothing'
    else:
        return 'Other'
