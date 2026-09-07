import streamlit as st
from backend.services.chat_service import ChatService
from backend.services.document_service import DocumentService


#Initiatize services
document_service=DocumentService()
chat_service=ChatService()

# -----------------------------
# Session State
# -----------------------------
if "updated_document" not in st.session_state:
    st.session_state.updated_document = None

if "selected_document" not in st.session_state:
    st.session_state.selected_document = None

st.title("Confluence AI Assistant")
documents=document_service.list_documents()

selected_document=st.selectbox("select the document",documents)

query=st.text_area("Enter your request")

# submit

if st.button("submit"):
    if query.strip()=="":
        st.warning("please enter a request")
    else:
        result=chat_service.chat(
            document_name=selected_document,
            query=query
        )

        intent=result["intent"]    
        response=result["response"]  

        if intent == "update":

            st.session_state.updated_document = response
            st.session_state.selected_document = selected_document

            st.subheader("Proposed Updated Document")
            st.markdown(response)

        else:

            st.subheader("Response")
            st.markdown(response)  

# ------------------------------------
# Accept / Reject Section
# ------------------------------------

if st.session_state.updated_document is not None:

    st.divider()

    col1, col2 = st.columns(2)

    with col1:
        if st.button("✅ Accept"):

            document_service.update_document(
                st.session_state.selected_document,
                st.session_state.updated_document
            )

            st.success("Document updated successfully.")

            # Clear session state
            st.session_state.updated_document = None
            st.session_state.selected_document = None

    with col2:
        if st.button("❌ Reject"):

            st.info("Changes discarded.")

            # Clear session state
            st.session_state.updated_document = None
            st.session_state.selected_document = None               