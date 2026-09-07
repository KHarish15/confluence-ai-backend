import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";
import {
    chat,
    updateDocument as updateDocumentAPI,
    createChat,
    appendMessage,
    getRecentChats,
    getChat
} from "../services/api";

function Update() {

    const [selectedDocument, setSelectedDocument] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hello! 👋\n\nTell me what changes you'd like to make to this document."
        }
    ]);

    const [prompt, setPrompt] = useState("");

    const [history, setHistory] = useState([]);

    const [currentChatId, setCurrentChatId] = useState(null);

    const [updatedDocument, setUpdatedDocument] = useState("");

    const [loading, setLoading] = useState(false);

    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const response = await getRecentChats("update");

            setHistory(response.data.history);

        } catch (err) {

            console.log(err);

        }

    };

    const newChat = () => {

        setCurrentChatId(null);
        setPrompt("");
        setUpdatedDocument("");
        setShowActions(false);

        setMessages([
            {
                role: "assistant",
                content:
                    "Hello! 👋\n\nTell me what changes you'd like to make to this document."
            }
        ]);

    };

    const openHistory = async (item) => {

        try {

            const response = await getChat(item._id);

            setCurrentChatId(item._id);

            setMessages(response.data.messages);

            setSelectedDocument(response.data.document_name);

        } catch (err) {

            console.log(err);

        }

    };

    const updateDocument = async () => {

        if (!selectedDocument) {

            alert("Please select a Confluence page.");

            return;

        }

        if (!prompt.trim()) return;

        try {

            setLoading(true);

            let chatId = currentChatId;

            if (!chatId) {

                const createResponse = await createChat({

                    feature: "update",
                    document_name: selectedDocument,
                    title: prompt

                });

                chatId = createResponse.data.chat_id;

                setCurrentChatId(chatId);

            }

            const userPrompt = prompt;

            setMessages(prev => [

                ...prev,

                {
                    role: "user",
                    content: userPrompt
                },

                {
                    role: "assistant",
                    content: "",
                    loading: true
                }

            ]);

            setPrompt("");

            await appendMessage({

                chat_id: chatId,
                role: "user",
                content: userPrompt

            });

            const response = await chat({

                page_id: selectedDocument,
                query: userPrompt

            });

            await appendMessage({

                chat_id: chatId,
                role: "assistant",
                content: response.data.response

            });

            setUpdatedDocument(response.data.response);

            setShowActions(true);

            setMessages(prev => {

                const updated = [...prev];

                updated[updated.length - 1] = {

                    role: "assistant",
                    content: response.data.response

                };

                return updated;

            });

            await loadHistory();

        } catch (err) {

            console.log(err);

            alert("Unable to generate updated document.");

        } finally {

            setLoading(false);

        }

    };

    const acceptChanges = async () => {

        try {

            await updateDocumentAPI(

                selectedDocument,
                updatedDocument

            );

            alert("Document updated successfully!");

            setUpdatedDocument("");

            setShowActions(false);

        } catch (err) {

            console.log(err);

            alert("Unable to update Confluence page.");

        }

    };

    return (

        <div className="assistant-layout">

            <Sidebar
                history={history}
                onNewChat={newChat}
                onOpenChat={openHistory}
            />

            <main className="assistant-main">

                <Conversation
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    messages={messages}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onSend={updateDocument}
                    loading={loading}
                >

                    {showActions && (

                        <div className="chat-actions">

                            <button
                                className="reject-btn"
                                onClick={() => {

                                    setUpdatedDocument("");

                                    setShowActions(false);

                                }}
                            >
                                Reject
                            </button>

                            <button
                                className="accept-btn"
                                onClick={acceptChanges}
                            >
                                Accept Changes
                            </button>

                        </div>

                    )}

                </Conversation>

            </main>

        </div>

    );

}

export default Update;