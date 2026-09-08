from datetime import datetime

from bson import ObjectId

from database.mongodb import mongodb
from datetime import datetime


class HistoryService:

    def __init__(self):

        self.collection = mongodb.chat_collection



    def create_chat(
        self,
        feature: str,
        document_name: str,
        title: str
    ):

        chat={
            "feature": feature,

            "document_name": document_name,

            "title": title,

            "messages": [],

            "created_at": datetime.utcnow(),

            "updated_at": datetime.utcnow()

        }

        result=self.collection.insert_one(chat)  
        return str(result.inserted_id)  



    def append_message(
        self,
        chat_id: str,
        role: str,
        content: str
    ):

        self.collection.update_one(

            {
                "_id": ObjectId(chat_id)
            },

            {
                "$push": {

                    "messages": {

                        "role": role,

                        "content": content,

                        "timestamp": datetime.utcnow()

                    }

                },

                "$set": {

                    "updated_at": datetime.utcnow()

                }

            }

        )


    def get_chat(self, chat_id: str):

        chat= self.collection.find_one(

            {
                "_id": ObjectId(chat_id)
            }

        )
        if chat:

            chat["_id"] = str(chat["_id"])

        return chat


    def get_recent_chats(self, feature: str):

        chats = list(

            self.collection.find(

                {
                    "feature": feature
                }

            ).sort(

                "updated_at", -1

            ).limit(5)

        )

        for chat in chats:

            chat["_id"] = str(chat["_id"])

        return chats



    def delete_chat(self, chat_id: str):

        self.collection.delete_one(

            {
                "_id": ObjectId(chat_id)
            }

        )    

history_service = HistoryService()
