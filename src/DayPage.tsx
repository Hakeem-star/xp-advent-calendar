import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { createSnow, showSnow } from "pure-snow.js";
import ConfettiComponent from "./Confetti";

const options = ["Game", "Quiz", "Jokes", "Riddles"];

const DayPage = () => {
  const params = useParams();
  const id = params.dayId;

  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledOptions = useMemo(() => shuffleArray(options), []);

  // show answer after pressing space
  useEffect(() => {
    createSnow();
    showSnow(true);
  }, []);

  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleActivityScreen, setVisibleActivityScreen] = useState<
    string | undefined
  >("");
  console.log({ visibleActivityScreen });
  const handleCelebrate = (index: number) => {
    setShowConfetti(true);
    setOpenedBoxes((openedBoxes) => {
      return [...openedBoxes, index];
    });
    // Reset trigger after a short delay
    setTimeout(() => {
      setShowConfetti(false);
    }, 100);
    setTimeout(() => {
      setVisibleActivityScreen(shuffledOptions[index - 1]);
    }, 700);
  };

  return (
    <div>
      <ConfettiComponent
        trigger={showConfetti}
        particleCount={500}
        spread={100}
      />
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
          borderImage: "url('./christmas-presents.png') 50% 0 50% 0% repeat",
          borderTopWidth: "70px",
          borderBottomWidth: "70px",
          borderColor: "#ef4444", // red-500
          height: "100svh",
          borderStyle: "solid",
          width: "100svw",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "8rem", // text-9xl
              opacity: 0.45,
              padding: "1.5rem", // p-6
              position: "absolute",
            }}
          >
            {id}
          </h1>
          {!visibleActivityScreen ? (
            <div
              style={{
                width: "80%",
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "auto",
              }}
            >
              <div
                className={`gift-box ${openedBoxes.includes(1) ? "open" : ""}`}
                onClick={() => handleCelebrate(1)}
                style={{
                  backgroundImage: "url('./gift-box.png')",
                  width: "256px",
                  height: "256px",
                  cursor: "pointer",
                }}
              />
              <div
                className={`gift-box ${openedBoxes.includes(2) ? "open" : ""}`}
                onClick={() => handleCelebrate(2)}
                style={{
                  backgroundImage: "url('./gift-box.png')",
                  width: "256px",
                  height: "256px",
                  cursor: "pointer",
                }}
              />
              <div
                className={`gift-box ${openedBoxes.includes(3) ? "open" : ""}`}
                onClick={() => handleCelebrate(3)}
                style={{
                  backgroundImage: "url('./gift-box.png')",
                  width: "256px",
                  height: "256px",
                  cursor: "pointer",
                }}
              />
              <div
                className={`gift-box ${openedBoxes.includes(4) ? "open" : ""}`}
                onClick={() => handleCelebrate(4)}
                style={{
                  backgroundImage: "url('./gift-box.png')",
                  width: "256px",
                  height: "256px",
                  cursor: "pointer",
                }}
              />
            </div>
          ) : visibleActivityScreen === "Game" ? (
            <GameScreen
              visibleActivityScreen={visibleActivityScreen}
              setVisibleActivityScreen={setVisibleActivityScreen}
            />
          ) : (
            <QuestionAnswerScreen
              visibleActivityScreen={visibleActivityScreen}
              setVisibleActivityScreen={setVisibleActivityScreen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DayPage;

function QuestionAnswerScreen({
  visibleActivityScreen,
  setVisibleActivityScreen,
}: {
  visibleActivityScreen: string;
  setVisibleActivityScreen: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  const jokes = [
    {
      q: "What do you call a bear with no teeth?",
      a: ["grizzly", "grizzly bear"],
    },
  ];
  const joke = jokes[0];
  const question = joke.q;
  const answers = [joke.a].flat();

  const [answer, setAnswer] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setAnswer((oldAnswer) => answers.slice(0, oldAnswer.length + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown, {
      once: true,
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answers]);
  return (
    <div
      style={{
        width: "100svw",
        height: "100%",
        display: "grid",
        placeItems: "center",
        alignSelf: "center",
        position: "relative",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.45,
          textAlign: "center",
          fontSize: "3.75rem",
          paddingTop: "4rem",
        }}
      >
        {visibleActivityScreen}
      </h1>
      <button
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0.45,
          textAlign: "center",
          fontSize: "3.75rem",
          paddingTop: "4rem",
          marginRight: "4rem",
          background: "none",
          color: "white",
          width: "fit-content",
        }}
        onClick={() => {
          setVisibleActivityScreen("");
        }}
      >
        X
      </button>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10rem",
        }}
      >
        <p
          style={{
            fontSize: "3.75rem", // text-6xl
          }}
        >
          {question}
        </p>
        {answer.map((row, idx) => {
          return (
            <p
              key={idx}
              style={{
                fontSize: "3.25rem",
                // text-4xl
                fontWeight: "bold",
              }}
            >
              {row}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function GameScreen({
  visibleActivityScreen,
  setVisibleActivityScreen,
}: {
  visibleActivityScreen: string;
  setVisibleActivityScreen: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  return (
    <div
      style={{
        width: "100svw",
        height: "100%",
        display: "grid",
        placeItems: "center",
        alignSelf: "center",
        position: "relative",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.45,
          textAlign: "center",
          fontSize: "3.75rem",
          paddingTop: "4rem",
        }}
      >
        {visibleActivityScreen}
      </h1>
      <button
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0.45,
          textAlign: "center",
          fontSize: "3.75rem",
          paddingTop: "4rem",
          marginRight: "4rem",
          background: "none",
          color: "white",
          width: "fit-content",
        }}
        onClick={() => {
          setVisibleActivityScreen("");
        }}
      >
        X
      </button>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10rem",
        }}
      >
        <a
          style={{
            fontSize: "3.75rem",
          }}
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          sdcvsdv
        </a>
      </div>
    </div>
  );
}
