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

function QA() {

    const [selectedDocument, setSelectedDocument] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! 👋\n\nAsk me anything about your selected document."
        }
    ]);

    const [prompt, setPrompt] = useState("");

    const [loading, setLoading] = useState(false);

    const [history, setHistory] = useState([]);

    const [currentChatId, setCurrentChatId] = useState(null);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const response = await getRecentChats("qa");

            setHistory(response.data.history);

        }

        catch (err) {

            console.log(err);

        }

    };

    const startNewChat = () => {

        setCurrentChatId(null);

        setSelectedDocument("");

        setMessages([
            {
                role: "assistant",
                content:"Hello! 👋\n\nSelect a Confluence page and ask me anything about its content."
            }
        ]);

        setPrompt("");

    };

    const askQuestion = async () => {

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

                    feature: "qa",

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

    const openHistory = async (item) => {

        try {

            const response = await getChat(item._id);

            setCurrentChatId(item._id);

            setMessages(response.data.messages);

            setSelectedDocument(response.data.document_name);

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

                    onSend={askQuestion}

                    loading={loading}

                />

            </main>

        </div>

    );

}

export default QA;