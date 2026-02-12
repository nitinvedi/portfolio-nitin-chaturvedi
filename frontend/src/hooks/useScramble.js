import { useState, useEffect, useRef } from "react";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const useScramble = (text, speed = 30) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (index < pos) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);
      pos += 1 / 3; // Speed of reveal

      if (pos >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    // scramble(); // Optional: Auto-start on mount
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return { displayText, scramble };
};
