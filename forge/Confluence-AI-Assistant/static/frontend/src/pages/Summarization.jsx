import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Conversation from "../components/Conversation";

import {
    chat,
    createChat,
    appendMessage,
    getRecentChats,
    getChat
} from "../services/api";

function Summarization() {

    const greeting = [
        {
            role: "assistant",
            content:
                "Hello! 👋\n\nSelect a Confluence page and ask me anything about its content."
        }
    ];

    const [selectedDocument, setSelectedDocument] = useState("");

    const [messages, setMessages] = useState(greeting);

    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState([]);

    const [currentChatId, setCurrentChatId] = useState(null);

    useEffect(() => {

        loadHistory();

    }, []);

    // ===========================
    // Load Chat History
    // ===========================

    const loadHistory = async () => {

        try {

            const response = await getRecentChats("summarization");

            setHistory(response.data.history);

        }

        catch (err) {

            console.log(err);

        }

    };

    // ===========================
    // Start New Chat
    // ===========================

    const startNewChat = () => {

        setCurrentChatId(null);

        setSelectedDocument("");

        setPrompt("");

        setMessages(greeting);

    };

    // ===========================
    // Generate Summary
    // ===========================

    const generateSummary = async () => {

        if (!selectedDocument) {

            alert("Please select a Confluence page.");


            return;

        }

        if (!prompt.trim()) {

            return;

        }

        try {

            setLoading(true);

            let chatId = currentChatId;

            if (!chatId) {

                const createResponse = await createChat({

                    feature: "summarization",

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

            setMessages(prev => {

                const updated = [...prev];

                updated[updated.length - 1] = {

                    role: "assistant",

                    content: response.data.response

                };

                return updated;

            });

            await loadHistory();

        }

        catch (err) {

            console.log(err);

            alert("Unable to generate response.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // Open Previous Chat
    // ===========================

    const openHistory = async (item) => {

        try {

            const response = await getChat(item._id);

            setCurrentChatId(item._id);

            setSelectedDocument(response.data.document_name);

            setMessages(response.data.messages);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="assistant-layout">

            <Sidebar
                history={history}
                onNewChat={startNewChat}
                onOpenChat={openHistory}
            />

            <main className="assistant-main">

                <Conversation
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    messages={messages}
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onSend={generateSummary}
                    loading={loading}
                />

            </main>

        </div>

    );

}

export default Summarization;