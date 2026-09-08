from fastapi import APIRouter
from backend.services.oauth_service import oauth_service

router =APIRouter(
    prefix="/oauth",
    tags=["OAuth"]
)


@router.get("/welcome")
def login():
    return {
        "message":"oauth successfully logged in"
    }

@router.get("/callback")
def callback(code: str):

    token = oauth_service.exchange_code(code)

    resources = oauth_service.get_accessible_resources()

    return {
        "token": token,
        "resources": resources,
        "cloud_id": oauth_service.cloud_id
    }

@router.get("/resources")
def get_accessible_resources():

    resource=oauth_service.get_accessible_resources()
    print("Cloud ID stored:", oauth_service.cloud_id)

    return {
        "resources": resource,
        "cloud_id": oauth_service.cloud_id
    }

    