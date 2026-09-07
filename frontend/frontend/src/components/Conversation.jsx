import DocumentBar from "./DocumentBar";
import ChatViewer from "./ChatViewer";
import ChatInput from "./ChatInput";

function Conversation({

    selectedDocument,

    setSelectedDocument,

    messages,

    prompt,

    setPrompt,

    onSend,

    loading,

    children

}) {

    return (

        <div className="response-card">

            <DocumentBar

                selectedDocument={selectedDocument}

                setSelectedDocument={setSelectedDocument}

            />

            <ChatViewer

                messages={messages}

            />

            <ChatInput

                prompt={prompt}

                setPrompt={setPrompt}

                onSend={onSend}

                loading={loading}

            />

            {children}

        </div>

    );

}

export default Conversation;