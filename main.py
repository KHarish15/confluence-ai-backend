from backend.services.chat_service import ChatService

chatservice=ChatService()
# ans=chatservice.chat(
#     document_name="cloud_migration.md",
#     query="summarize it"
    
# )
# ans=chatservice.chat(
#     document_name="cloud_migration.md",
#     query="What is the main objective of this migration?"
    
# )

ans=chatservice.chat(
    document_name="cloud_migration.md",
    query="Rewrite the migration strategy to include a rollback plan."
)
    

print(ans)