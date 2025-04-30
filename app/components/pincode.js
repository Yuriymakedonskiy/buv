'use client';

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

export function Pincode() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef([]);
  const spyRef = useRef(null);
  const router = useRouter();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newPin = [...pin];
    newPin[index] = value[0];
    setPin(newPin);

    if (index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }

    if (index === 3) {
      setTimeout(() => validatePin(newPin.join("")), 100);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const newPin = [...pin];
      newPin[index - 1] = "";
      setPin(newPin);
      inputsRef.current[index - 1].focus();
    }
  };

  const validatePin = (input) => {
    if (input === "1977") {
      router.push("https://disk.yandex.ru/d/OgZw3KLC2W5MQQ"); 
    } else {
      setError(true);
      playFailFeedback();
    }
  };

  const playFailFeedback = () => {
    const audio = new Audio("/audio/LuiKang.mp3");
    audio.play();

    setTimeout(() => {
      setError(false);
      setPin(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    }, 2000);
  };

  useEffect(() => {
    if (error && spyRef.current) {
      gsap.fromTo(
        spyRef.current,
        { x: "0", opacity: 1 },
        { x: "110vw", duration: 3 }
      );
    }
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '50px auto',
      width: '100%',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        width: '50%',
        justifyContent: 'center',
      }}>
        {pin.map((digit, idx) => (
          <input
            key={idx}
            ref={el => inputsRef.current[idx] = el}
            type="text"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            style={{
              width: '50%',
              // height: '5vw',
              background: 'none',
              border: '1px solid #D12727',
              borderRight: idx !== pin.length - 1 ? 'none' : '1px solid #D12727',
              color: '#D12727',
              textAlign: 'center',
              fontSize: '5vw',
              
            }}
          />
        ))}
      </div>

      {error && (
        <>
          <p style={{
            marginTop: '20px',
            color: 'red',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            ШПИОН ВЫЙДИ ВОН!
          </p>
          <img
            ref={spyRef}
            src="/LiuKang.webp"
            alt="LiuKang"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '120px',
              zIndex: 1000
            }}
          />
        </>
      )}
    </div>
  );
}
