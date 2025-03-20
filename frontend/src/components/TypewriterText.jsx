import React, { useState, useEffect } from "react";

const texts = ["Hello Adi", "Pickleball today?"];
const FINAL_TEXT = "Hello Adi!"; // Final stop text

function TypewriterText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [pause, setPause] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // Stop animation flag

  useEffect(() => {
    if (pause || isComplete) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < texts[index].length) {
          setText((prev) => prev + texts[index][charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          if (index === texts.length - 1) {
            setPause(true);
            setTimeout(() => setPause(false), 2000);
            setIsDeleting(true);
          } else {
            setPause(true);
            setTimeout(() => setPause(false), 2000);
            setIsDeleting(true);
          }
        }
      } else {
        if (charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else {
          if (index === texts.length - 1) {
            setIsComplete(true); // Stop typing after one cycle
            setText(FINAL_TEXT); // Set final text with an exclamation mark
          } else {
            setPause(true);
            setTimeout(() => setPause(false), 500);
            setIsDeleting(false);
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, pause, isComplete]);

  return (
    <div className="p-4 rounded-2xl backdrop-blur-md">
      <div className="text-3xl font-bold">{text}{!isComplete && "|"}</div>
    </div>
  );
}

export default TypewriterText;
