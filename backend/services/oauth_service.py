import os
import requests
from dotenv import load_dotenv

load_dotenv()


class OAuthService:

    def __init__(self):

        self.client_id = os.getenv("ATLASSIAN_CLIENT_ID")
        self.client_secret = os.getenv("ATLASSIAN_CLIENT_SECRET")
        self.redirect_uri = os.getenv("ATLASSIAN_REDIRECT_URI")

        self.access_token = None
        self.refresh_token = None
        self.cloud_id = None

    def exchange_code(self, code: str):

        url = "https://auth.atlassian.com/oauth/token"

        payload = {
            "grant_type": "authorization_code",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "code": code,
            "redirect_uri": self.redirect_uri
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(
            url,
            json=payload,
            headers=headers
        )

        token = response.json()

        # Store the tokens
        self.access_token = token.get("access_token")
        self.refresh_token = token.get("refresh_token")

        return token

    def get_accessible_resources(self):

        url = "https://api.atlassian.com/oauth/token/accessible-resources"

        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers
        )

        resources = response.json()

        # Save the Cloud ID for later use
        if isinstance(resources, list) and len(resources) > 0:
            self.cloud_id = resources[0]["id"]

        
        print("OAuthService instance:", id(self))
        print("Cloud ID after saving:", self.cloud_id)    

        return resources


oauth_service = OAuthService()