# from fastapi import FastAPI
# from backend.services.document_service import DocumentService
# from fastapi import APIRouter 
# from pydantic import BaseModel

# router=APIRouter(
#     prefix="/documents",
#     tags=["Documents"]
# )

# document_service=DocumentService()

# class  UpdatePageRequest(BaseModel):
#     updated_content:str


# @router.get("/")
# def list_documents():
#     """
#     Return all the available documents
#     """
#     return {
#         "documents":document_service.list_documents()
#     }

# @router.put("/{document_name}")
# def update_document(document_name:str,
#     request:UpdateDocumentRequest):

#     """
#     update a document
#     """

#     document_service.update_document(
#         document_name=document_name,
#         updated_content=request.updated_content
#     )

#     return {
#         "message":"document updated successfully"
#     }