import React, { useState, useEffect } from "react";

const texts = ["Hello", "Pickleball today?"];

function TypewriterText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [pause, setPause] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // Stop animation flag
  const [finalText, setFinalText] = useState("Hello");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo && userInfo.name) {
      const firstName = userInfo.name.split(' ')[0];
      setFinalText(`Hello ${firstName} 👋`);

    }
  }, []);

  useEffect(() => {
    if (pause || isComplete) return;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < texts[index].length) {
          setText((prev) => prev + texts[index][charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          setPause(true);
          setTimeout(() => setPause(false), 2000);
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else {
          if (index === texts.length - 1) {
            setIsComplete(true); // Stop typing after one cycle
            setText(finalText); // Display personalized greeting
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
