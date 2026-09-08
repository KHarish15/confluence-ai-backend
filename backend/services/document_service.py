
from pathlib import Path
# Read & Write documents

class DocumentService:

    def __init__(self):
        self.documents_path = Path(__file__).resolve().parent.parent / "documents"


     # showing all the files
    def list_documents(self):
        """
        Returns all markdown files inside the documents folder.
        """

        return sorted(
            [
                file.name for file in self.documents_path.glob("*.md")
            ]
        )

    def load_document(self, document_name:str):
        """
        Reads and returns the content of a document.
        """

        document_path=self.documents_path/document_name

        if not document_path.exists():
            raise FileNotFoundError(f"{document_name} not found")
          
        return document_path.read_text(encoding="utf-8")  

    def update_document(self,document_name:str,updated_content:str ):
        """
        Overwrites the document with updated content.
        """

        document_path=self.documents_path/document_name

        if not document_path.exists():
            raise FileNotFoundError(f"{document_name} not found")

        document_path.write_text(updated_content,encoding="utf-8")
        return True
