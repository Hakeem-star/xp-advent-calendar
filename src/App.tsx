import "./App.css";
import { useEffect } from "react";
import { createSnow, showSnow } from "pure-snow.js";

// days to render
const adventDays = [
  22, 5, 13, 3, 1, 11, 2, 20, 16, 8, 14, 9, 24, 10, 6, 15, 7, 18, 4, 12, 17, 23,
  21, 19,
];

const guests = [
  "Adult-Santa-Suit-2024_spygji.png",
  "naughtyelf.webp",
  "Elf-with-hands-in-the-air-cartoon-white-b-98729124.png",
  "rudolf-clipart-xl.png",
  "elf-fluff.png",
  "rudolf-goofy.webp",
  "elf-trad.png",
  "santa-with-sack.png",
];

const isDecember = new Date().getMonth() === 11;
const currentDate = new Date().getUTCDate();
// const isPastCurrentDay = currentDate > adventDays[currentDate - 1];
// const today;
// const unopened;

function App() {
  useEffect(() => {
    createSnow();
    showSnow(true);
  }, []);

  return (
    <>
      <div
        className="background"
        style={{
          position: "fixed",
          top: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // prevent the invert from the days from being applied to items (background) outside of the container
          backdropFilter: "blur(0px)",
        }}
      >
        <div
          id="snow"
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
          }}
        />
        <div
          style={{
            borderRadius: "1rem",
            width: "max-content",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "30%",
              aspectRatio: "1/1",
              backdropFilter: "blur(5px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: 'url("./christmas-x-blue-tree.webp")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gridTemplateRows: "repeat(5, 1fr)",
              // padding: "2rem",
              gap: "2rem",
              width: "100vh",
              // aspectRatio: "1/1",
            }}
          >
            {Array.from({ length: 30 }).map((_, index) => {
              const currentDayNumber =
                (![9, 10, 15, 16, 21, 22].includes(index + 1) &&
                  adventDays.shift()) ||
                0;
              const isPastCurrentDay = currentDate > currentDayNumber;
              const isCurrentDay = currentDate === currentDayNumber;
              return (
                <div
                  className="day-container"
                  key={index}
                  style={{
                    color: "red",
                    fontSize: "2rem",
                    width: "100%",
                    aspectRatio: "1/1",
                    outline: isCurrentDay
                      ? "1px solid gold"
                      : isPastCurrentDay
                      ? "1px solid red"
                      : "1px solid blue",
                    borderRadius: "1rem",
                    opacity: [9, 10, 15, 16, 21, 22].includes(index + 1)
                      ? 0
                      : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    cursor: [9, 10, 15, 16, 21, 22].includes(index + 1)
                      ? "default"
                      : "pointer",
                    // mixBlendMode: "difference",
                    backdropFilter: `blur(30px) brightness(10.2) drop-shadow(4px 4px 10px ${
                      index % 2 === 0 ? "red" : "blue"
                    })`,
                    filter: "drop-shadow(4px 4px 10px black)",
                    // background: "white",
                  }}
                >
                  {currentDayNumber}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="guest-image"
                      style={{
                        backgroundImage: 'url("./guests/elf-fluff.png")',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
