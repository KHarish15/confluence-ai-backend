import { Routes, Route } from "react-router-dom";
import { motion, useDragControls } from "framer-motion";

import Navbar from "./Navbar";

import Summarization from "../pages/Summarization";
import QA from "../pages/QA";
import Update from "../pages/Update";

function AssistantPanel({ onClose }) {

    const dragControls = useDragControls();

    return (

        <div className="assistant-overlay">

            <motion.div
                className="assistant-panel"
                drag
                dragListener={false}
                dragControls={dragControls}
                dragMomentum={false}
                dragElastic={0.05}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
            >

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <header
                    className="topbar"
                    onPointerDown={(event) => dragControls.start(event)}
                >

                    <h1>Confluence AI Assistant</h1>

                    <p>
                        Analyze, summarize and understand your Confluence documentation using AI.
                    </p>

                </header>

                <Navbar />

                <Routes>

                    <Route path="/" element={<Summarization />} />
                    <Route path="/qa" element={<QA />} />
                    <Route path="/update" element={<Update />} />

                </Routes>

            </motion.div>

        </div>

    );

}

export default AssistantPanel;