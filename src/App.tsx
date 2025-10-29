import "./App.css";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid red",
          width: "fit-content",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(5, 1fr)",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              style={{
                color: "red",
                fontSize: "2rem",
                width: "15vw",
                height: "15vh",
                outline: "1px solid red",
                borderRadius: "1rem",
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div style={{ color: "red", fontSize: "2rem" }}>CHRISTMAS</div>
    </div>
  );
}

export default App;
