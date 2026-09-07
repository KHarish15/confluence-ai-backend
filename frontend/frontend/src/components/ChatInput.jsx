function ChatInput({

    prompt,

    setPrompt,

    onSend,

    loading

}) {

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            onSend();

        }

    };

    return (

        <div className="chat-input-container">

            <textarea
                rows={2}
                
                className="chat-input"

                placeholder="Ask anything about this document..."

                value={prompt}

                onChange={(e) => setPrompt(e.target.value)}

                onKeyDown={handleKeyDown}

                disabled={loading}

            />

            <button

                className="send-btn"

                onClick={onSend}

                disabled={loading}

            >

                ➤

            </button>

        </div>

    );

}

export default ChatInput;