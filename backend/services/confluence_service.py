import requests
import markdown
from markdownify import markdownify

from services.oauth_service import oauth_service


class ConfluenceService:

    # ==========================================
    # Get All Spaces
    # ==========================================
    def get_spaces(self):

        url = (
            f"https://api.atlassian.com/ex/confluence/"
            f"{oauth_service.cloud_id}/wiki/api/v2/spaces"
        )

        headers = {
            "Authorization": f"Bearer {oauth_service.access_token}",
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers
        )

        response.raise_for_status()

        return response.json()


    # ==========================================
    # Get All Pages in a Space
    # ==========================================
    def get_pages(self, space_id: str):

        url = (
            f"https://api.atlassian.com/ex/confluence/"
            f"{oauth_service.cloud_id}"
            f"/wiki/api/v2/spaces/{space_id}/pages"
        )

        headers = {
            "Authorization": f"Bearer {oauth_service.access_token}",
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers
        )

        response.raise_for_status()

        return response.json()

    # ==========================================
    # Convert HTML -> Markdown
    # ==========================================
    def convert_html_to_markdown(self, html: str):

        markdown_text = markdownify(
            html,
            heading_style="ATX"
        )

        return markdown_text.strip()

    # ==========================================
    # Get Complete Page
    # ==========================================
    def get_page(self, page_id: str):

        url = (
            f"https://api.atlassian.com/ex/confluence/"
            f"{oauth_service.cloud_id}"
            f"/wiki/api/v2/pages/{page_id}"
            f"?body-format=storage"
        )

        headers = {
            "Authorization": f"Bearer {oauth_service.access_token}",
            "Accept": "application/json"
        }

        response = requests.get(
            url,
            headers=headers
        )

        response.raise_for_status()

        return response.json()

    # ==========================================
    # Get Page Content (Markdown)
    # ==========================================
    def get_page_content(self, page_id: str):

        page = self.get_page(page_id)

        html = page["body"]["storage"]["value"]

        return self.convert_html_to_markdown(html)

    # ==========================================
    # Update Page
    # ==========================================
    def update_page(self, page_id: str, updated_content: str):

        # Get latest page
        page = self.get_page(page_id)

        title = page["title"]
        version = page["version"]["number"]

        # Markdown -> HTML
        html_content = markdown.markdown(updated_content)

        payload = {
            "id": page_id,
            "status": "current",
            "title": title,
            "version": {
                "number": version + 1
            },
            "body": {
                "representation": "storage",
                "value": html_content
            }
        }

        put_url = (
            f"https://api.atlassian.com/ex/confluence/"
            f"{oauth_service.cloud_id}"
            f"/wiki/api/v2/pages/{page_id}"
        )

        headers = {
            "Authorization": f"Bearer {oauth_service.access_token}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        response = requests.put(
            put_url,
            headers=headers,
            json=payload
        )

        response.raise_for_status()

        return response.json()


confluence_service = ConfluenceService()