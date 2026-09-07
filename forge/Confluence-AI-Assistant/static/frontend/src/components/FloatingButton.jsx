function FloatingButton({ onClick }) {
  return (
    <button
      style={{
        position: "fixed",
        right: "30px",
        bottom: "30px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        background: "#0052cc",
        color: "white",
        fontSize: "22px",
        border: "none",
        cursor: "pointer",
        zIndex: 999999
      }}
      onClick={() => {
        console.log("CLICK");
        alert("CLICK");
        onClick();
      }}
    >
      AI
    </button>
  );
}

export default FloatingButton;