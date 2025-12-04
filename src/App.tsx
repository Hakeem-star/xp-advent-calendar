import { Day } from "./Day";
import "./App.css";
import { useEffect } from "react";
import { createSnow, showSnow } from "pure-snow.js";

const isDecember = new Date().getMonth() === 11;
const currentDate = new Date().getUTCDate();
// const isPastCurrentDay = currentDate > adventDays[currentDate - 1];
// const today;
// const unopened;

function App() {
  // days to render
  const adventDays = [
    22, 5, 13, 3, 1, 11, 2, 20, 16, 8, 14, 9, 24, 10, 6, 15, 7, 18, 4, 12, 17,
    23, 21, 19,
  ];

  const disabledDays = [9, 10, 15, 16, 21, 22];

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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: 'url("./assets/christmas-x-blue-tree.webp")',
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
              const isDisabled = disabledDays.includes(index + 1);

              const currentDayNumber = (!isDisabled && adventDays.shift()) || 0;
              const isPastCurrentDay = currentDate > currentDayNumber;
              const isCurrentDay = currentDate === currentDayNumber;
              return (
                <Day
                  key={index}
                  index={index}
                  isCurrentDay={isCurrentDay}
                  isPastCurrentDay={isPastCurrentDay}
                  currentDayNumber={currentDayNumber}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
