import { use, useState, useEffect } from "react";
import { useParams } from "react-router";

const DayPage = () => {
  const jokes = [
    {
      q: "What do you call a bear with no teeth?",
      a: ["grizzly", "grizzly bear"],
    },
  ];
  const params = useParams();
  const id = params.dayId;
  const joke = jokes[0];
  const question = joke.q;
  const answers = [joke.a].flat();

  const [answer, setAnswer] = useState<string[]>([]);

  // show answer after pressing space

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        setAnswer((oldAnswer) => answers.slice(0, oldAnswer.length + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answers]);

  return (
    <div>
      <div
        style={{
          borderImage: "url('./christmas-presents.png') 50% 0 50% 0% repeat",
          borderTopWidth: "70px",
          borderBottomWidth: "70px",
          borderColor: "#ef4444", // red-500
          height: "100svh",
          borderStyle: "solid",
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
          <div
            style={{
              width: "100svw",
              height: "50%",
              display: "grid",
              placeItems: "center",
              alignSelf: "center",
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
                    fontSize: "2.25rem", // text-4xl
                    fontWeight: "bold",
                  }}
                >
                  {row}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPage;

// border-width: 70px;
// border-width: 70px;
// border-color: #ef4444;
// height: 100svh;
