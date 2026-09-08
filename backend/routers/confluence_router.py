from fastapi import APIRouter
from pydantic import BaseModel
from backend.confluence_service import confluence_service
from backend.services.oauth_service import oauth_service
from backend.services.chat_service import chat_service
router= APIRouter(
    prefix="/confluence",
    tags=["Confluence"]

)

@router.get("/spaces")
def get_spaces():
        spaces=confluence_service.get_spaces()

        return {
                "spaces":spaces
        }

# ==========================================
# Get All Pages in a Space  <-- ADD THIS
# ==========================================
@router.get("/spaces/{space_id}/pages")
def get_space_pages(space_id: str):

    pages = confluence_service.get_pages(space_id)

    return {
        "pages": pages
    }

@router.get("/pages/{page_id}")
def get_pages(page_id:str):
        pages=confluence_service.get_page_content(page_id)

        print("Cloud ID:", oauth_service.cloud_id)
        print("Access Token:", oauth_service.access_token)
        return {
                "pages":pages
        }







class UpdatedPageRequest(BaseModel):
        updated_content:str


@router.put("/pages/{page_id}")
def update_page_content(page_id:str,request:UpdatedPageRequest):
        response=confluence_service.update_page(
                page_id=page_id,
                updated_content=request.updated_content
        )

        return {
                "message": "Page updated successfully",
                "page": response
        }