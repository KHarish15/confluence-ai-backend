import { useState } from "react";
import FloatingButton from "./components/FloatingButton";
import AssistantPanel from "./components/AssistantPanel";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open ? (
        <FloatingButton onClick={() => setOpen(true)} />
      ) : (
        <AssistantPanel onClose={() => setOpen(false)} />
      )}
    </>
  );
}

export default App;