from langchain_core.prompts import PromptTemplate

from services.confluence_service import confluence_service
from services.intent_service import IntentService
from services.llm import LLMService

from prompts.summarize_prompt import SUMMARIZE_PROMPT
from prompts.qa_prompt import QA_PROMPT
from prompts.update_prompt import UPDATE_PROMPT


# Main orchestration


class ChatService:
    def __init__(self):
        self.llm=LLMService()
        self.intent_service=IntentService()

    def chat(self, page_id: str, query:str):
        #load document
        document = confluence_service.get_page_content(page_id)

        # detect intent
        intent=self.intent_service.intent_idetifier(query)

        # summarization
        if intent=="summarize":
            response= self._summarize(document,query)

        elif intent=="qa":
            response= self._question_answer(document,query)
        elif intent == "update":

            updated_document = self._update_document(document, query)

            # confluence_service.update_page(
            #     page_id=page_id,
            #     updated_content=updated_document
            # )

            response = updated_document

        else:
            response = "Unable to determine the intent."

        return {
            "intent": intent,
            "response": response
        }    
    

    def _summarize(self,document:str,query: str)->str:
        prompt=PromptTemplate(
            template=SUMMARIZE_PROMPT,
            input_variables=["document","instruction"]
        )

        structured_output=prompt.format(
            document=document,
            instruction=query
        )

        response=self.llm.generate_response(structured_output)    
        return response

    def _question_answer(self, document:str,query:str)->str:
        prompt=PromptTemplate(
            template=QA_PROMPT,
            input_variables=["document","question"]
        )

        structured_output=prompt.format(
            document=document,
            question=query
        )

        response=self.llm.generate_response(structured_output)    
        return response


    def _update_document(self,document:str,query:str)->str:
        prompt=PromptTemplate(
            template=UPDATE_PROMPT,
            input_variables=["document", "instruction"]
        )

        structured_output=prompt.format(
            document=document,
            instruction=query
        )

        response=self.llm.generate_response(structured_output)

        print("=" * 80)
        print("LLM UPDATE RESPONSE")
        print("=" * 80)
        print(response)
        print("=" * 80)

        return response

chat_service= ChatService()