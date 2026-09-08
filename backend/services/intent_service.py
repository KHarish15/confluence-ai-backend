 # Detect user intent
from services.llm import LLMService
from prompts.intent_prompt import INTENT_PROMPT
from langchain_core.prompts import PromptTemplate



class IntentService:
    def __init__(self):
        self.llm=LLMService()

        self.prompt_template=PromptTemplate(
            template=INTENT_PROMPT,
            input_variables=["query"]

        )

    def intent_idetifier(self,query:str)->str:
        """
        detect the intent of the user
        """

        formatted_prompt=self.prompt_template.format(query=query)

        intent=self.llm.generate_response(formatted_prompt)

        return intent.strip().lower()


