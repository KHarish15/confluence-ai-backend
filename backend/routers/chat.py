
from pydantic import BaseModel
from fastapi import APIRouter
from backend.backend.services.chat_service import ChatService

router=APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

chat_service=ChatService()

# request body
class ChatRequest(BaseModel):
    page_id:str
    query:str

@router.post("/")
def chat(request:ChatRequest):

    """
    chat with a document
    """
    return chat_service.chat(
        page_id=request.page_id,
        query=request.query

    )


