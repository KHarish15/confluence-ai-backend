from fastapi import APIRouter


from backend.services.history_service import history_service

from pydantic import BaseModel

router=APIRouter(
    prefix="/history",
    tags=["History"]
)


class CreateChatRequest(BaseModel):

    feature: str

    document_name: str

    title: str

class AppendMessageRequest(BaseModel):

    chat_id: str

    role: str

    content: str    



@router.post("/create")
def create_chat(request:CreateChatRequest):
    chat_id=history_service.create_chat(
        feature=request.feature,
        document_name=request.document_name,
        title=request.title

    )   
    return {
        "chat_id": chat_id,
        "message":"chat created successfully"
    }  

@router.post("/message")
def append_message(request:AppendMessageRequest):
    history_service.append_message(
        chat_id=request.chat_id,
        role=request.role,
        content=request.content


    )

    return {

        "message": "Message appended successfully"

    }




@router.get("/{feature}")
def get_recent_chats(feature: str):

    chats = history_service.get_recent_chats(feature)

    return {

        "history": chats

    }

@router.get("/chat/{chat_id}")
def get_chat(chat_id: str):

    return history_service.get_chat(chat_id)


@router.delete("/{chat_id}")
def delete_chat(chat_id: str):

    history_service.delete_chat(chat_id)

    return {

        "message": "Chat deleted successfully"

    }

