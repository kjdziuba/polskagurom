import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('punkt_tab')
nltk.download('stopwords')
nltk.download('wordnet')

# Initialize stopwords and lemmatizer
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

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
    elif re.search(r'\b(grocery|walmart|supermarket|health)\b', processed_title):
        return 'Groceries'
    elif re.search(r'\b(uber|taxi|lyft|car|transport|bus|train|fuel|travel)\b', processed_title):
        return 'Transport'
    elif re.search(r'\b(netflix|spotify|subscription|ticket|book|gaming|sporting|sport|electronics|fitness)\b', processed_title):
        return 'Entertainment'
    elif re.search(r'\b(rent|mortgage|property|lease)\b', processed_title):
        return 'Rent'
    elif re.search(r'\b(water|electricity|utilities|bill|phone|mobile)\b', processed_title):
        return 'Utilities'
    else:
        return 'Other'
