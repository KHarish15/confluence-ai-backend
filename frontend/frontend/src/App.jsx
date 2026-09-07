import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import "./App.css";

import FloatingButton from "./components/FloatingButton";
import AssistantPanel from "./components/AssistantPanel";

function App() {

    const [open, setOpen] = useState(false);

    return (

        <BrowserRouter>

            {!open && (

                <FloatingButton
                    onClick={() => setOpen(true)}
                />

            )}

            {open && (

                <AssistantPanel
                    onClose={() => setOpen(false)}
                />

            )}

        </BrowserRouter>

    );

}

export default App;