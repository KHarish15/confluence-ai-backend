import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()


class MongoDB:

    def __init__(self):

        mongo_uri = os.getenv("MONGODB_URI")

        self.client = MongoClient(mongo_uri)

        self.db = self.client[os.getenv("DATABASE_NAME")]

        self.chat_collection = self.db["chat_history"]


mongodb = MongoDB()