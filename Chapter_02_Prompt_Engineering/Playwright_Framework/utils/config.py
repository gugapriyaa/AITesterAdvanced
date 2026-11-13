import os
from dotenv import load_dotenv

load_dotenv()

VALID_USERNAME = os.getenv("VALID_USERNAME", "")
VALID_PASSWORD = os.getenv("VALID_PASSWORD", "")
BASE_URL = os.getenv("BASE_URL", "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
