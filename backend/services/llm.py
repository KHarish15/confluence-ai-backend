from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

# # Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

class LLMService:

    def __init__(self):

        api_key = os.getenv("GROQ_API_KEY")

        self.model = ChatGroq(
            model="openai/gpt-oss-20b",
            api_key=api_key
        )

    def generate_response(self, prompt:str)->str:
        response=self.model.invoke(prompt) 
        return response.content 








# print(type(model))
# ans=model.invoke("hi hello")
# print(type(ans))
# print(ans)

 