from fastapi import FastAPI
from backend.database.mongodb import mongodb
from fastapi.middleware.cors import CORSMiddleware
#from backend.routers.document import router as document_router
from backend.routers.chat import router as chat_router
from backend.routers.history_routes import router as  history_router
from backend.routers.oauth import router as oauth_router
from backend.routers.confluence_router import router as conf_router

# create fastapi application
app=FastAPI(
    title="Confluence AI Assistant",
    description="AI-powered Confluence Assistant using Gemini",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#app.include_router(document_router)
app.include_router(chat_router)
app.include_router(history_router)
app.include_router(oauth_router)
app.include_router(conf_router)
app.include_router(chat_router)




@app.get("/")
def home():
    return{
        "message":"Confluence AI Assistant Backend.is Running"
    }

@app.get("/mongo-test")
def mongo_test():

    mongodb.chat_collection.insert_one({
        "message": "MongoDB Connected Successfully"
    })

    return {"message": "Inserted Successfully"}