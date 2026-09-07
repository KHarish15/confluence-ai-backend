from backend.services.llm import LLMService

llm=LLMService()

ans=llm.generate_response("hey hi hello")
# print(type(ans))
print(ans)
