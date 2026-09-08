INTENT_PROMPT = """
You are an intent classification assistant.

Classify the user's request into exactly ONE of the following intents.

1. summarize
2. qa
3. update

Definitions:

summarize
- The user wants a summary or overview.

qa
- The user is asking a question about the document.

update
- The user wants to modify, rewrite, append, delete, or edit the document.

Return ONLY one word.

User Query:
{query}
"""