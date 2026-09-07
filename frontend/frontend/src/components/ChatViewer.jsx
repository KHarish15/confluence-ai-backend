import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatViewer({ messages }) {

    const bottomRef = useRef(null);

    const [animatedText, setAnimatedText] = useState("");

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    // Animate only the initial welcome message
    useEffect(() => {

        if (

            messages.length === 1 &&
            messages[0].role === "assistant"

        ) {

            const fullText = messages[0].content;

            let index = 0;

            setAnimatedText("");

            const timer = setInterval(() => {

                index++;

                setAnimatedText(

                    fullText.substring(0, index)

                );

                if (index >= fullText.length) {

                    clearInterval(timer);

                }

            }, 25);

            return () => clearInterval(timer);

        }

    }, [messages]);

    if (!messages || messages.length === 0) {

        return (

            <div className="chat-viewer">

                <p className="empty-text">

                    No conversation yet.

                </p>

            </div>

        );

    }

    return (

        <div className="chat-viewer">

            {

                messages.map((message, index) => (

                    <div

                        key={index}

                        className={`message-card ${message.role}`}

                    >

                        <div className="message-role">

                            {

                                message.role === "user"

                                    ? "You"

                                    : "AI Assistant"

                            }

                        </div>

                        <div className="message-content">

                            {

                                message.loading ? (

                                    <div className="typing-indicator">

                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                ) : (

                                    message.role === "assistant" ? (

                                        <ReactMarkdown>

                                            {
                                                index === 0 &&
                                                messages.length === 1
                                                    ? animatedText
                                                    : message.content
                                            }

                                        </ReactMarkdown>

                                    ) : (

                                        message.content

                                    )

                                )

                            }

                        </div>

                    </div>

                ))

            }

            <div ref={bottomRef}></div>

        </div>

    );

}

export default ChatViewer;