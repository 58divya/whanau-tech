import re

def is_valid_email(email):
    """
    Validate email format using a regex pattern.
    Returns True if valid, False otherwise.
    """
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_strong_password(password):
    """
    Validate password strength:
    - Minimum 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    Returns True if password meets criteria, False otherwise.
    """
    if not password or len(password) < 8:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'\d', password):
        return False
    return True
