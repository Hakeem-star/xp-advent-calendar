import { useState } from "react";
import { useNavigate } from "react-router";

const disabledIndexes = [9, 10, 15, 16, 21, 22];

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

export function Day({
  index,
  isCurrentDay,
  isPastCurrentDay,
  currentDayNumber,
}: {
  index: number;
  isCurrentDay: boolean;
  isPastCurrentDay: boolean;
  currentDayNumber: number;
}) {
  const [guest, setGuest] = useState<string | undefined>(undefined);
  const [rotate, setRotate] = useState<number | undefined>(undefined);
  const color = isCurrentDay
    ? "gold"
    : isPastCurrentDay
    ? "rgba(255,255,255, 0.2)"
    : "white";
  const navigate = useNavigate();

  const isDisabled = disabledIndexes.includes(index + 1);

  return (
    <div
      onMouseEnter={() => {
        setGuest(guests[Math.floor(Math.random() * guests.length)]);
        setRotate(Math.floor(Math.random() * 360));
      }}
      className="day-container"
      key={index}
      style={{
        pointerEvents: isDisabled ? "none" : "auto",
        color: color,
        fontSize: "4rem",
        width: "100%",
        aspectRatio: "1/1",
        outline: `1px solid ${color}`,
        borderRadius: "1rem",
        opacity: disabledIndexes.includes(index + 1) ? 0 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        cursor: disabledIndexes.includes(index + 1) ? "default" : "pointer",
        // mixBlendMode: "difference",
        backdropFilter: `blur(30px) brightness(10.2) drop-shadow(4px 4px 10px ${
          index % 2 === 0 ? "red" : "blue"
        })`,
        filter: "drop-shadow(4px 4px 10px black)", // background: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => {
          e.preventDefault();
          if (!isDisabled) {
            navigate(`/${currentDayNumber}`);
          }
        }}
      >
        <p>{currentDayNumber}</p>

        <div
          className="guest-image"
          style={{
            visibility: isPastCurrentDay ? "hidden" : "visible",
            position: "absolute",
            top: 0,
            backgroundImage: `url("./assets/guests/${guest}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "100%",
            height: "100%",
            rotate: rotate ? `${rotate}deg` : undefined,
          }}
        />
      </div>
    </div>
  );
}
