import React from "react";
import { useEffect, useRef } from "react";
import "./App.css";
import Logo from "./images/brand-name-white.png";
import axios from "axios";
import Swal from "sweetalert2";
import SlattLogo from './slattlifeee.png'

import CountdownTimers from "./CountdownTimerTwo";
// import useSound from 'use-sound';
import Marquee from "react-fast-marquee";


function App() {
  // const [playSound] = useSound('music.mp3');
  const inputRef = useRef(null);
  useEffect(() => {
    const placeholderTexts = [
      "Get notifications as we launch",
      "Enter your Email",
    ];
    let currentIndex = 0;
    let currentText = "";
    let currentTextIndex = 0;
    let typingInterval;

    const typePlaceholder = () => {
      if (currentTextIndex < placeholderTexts[currentIndex].length) {
        currentText += placeholderTexts[currentIndex][currentTextIndex++];
        inputRef.current.placeholder = currentText;
      } else {
        clearInterval(typingInterval);
        currentText = "";
        currentTextIndex = 0;
        currentIndex = (currentIndex + 1) % placeholderTexts.length;
        setTimeout(() => {
          typingInterval = setInterval(typePlaceholder, 100); // Typing speed (milliseconds)
        }, 1500); // Delay between sentences (milliseconds)
      }
    };

    typingInterval = setInterval(typePlaceholder, 100); // Start typing the placeholder text

    return () => {
      clearInterval(typingInterval); // Clean up the interval on component unmount
    };
  }, []); // Run this effect only once after the initial render

  // REGULAR EXPRESSION
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const SendEmails = (e) => {
    e.preventDefault();
    const email = inputRef.current.value;
    if (isValidEmail(email)) {
      axios
        .post("https://sheetdb.io/api/v1/by3dj0u3ntdiz", { email })
        .then((response) => {
          console.log("Email sent successfully:", response.data);
          Swal.fire({
            icon: "success",
            text: "Successfully subscribed Slatt!",
          });
          inputRef.current.value = "";
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Use a valid email Slatt!",
      });
    }
  };

  return (
    <div>
      <div className="app-container">
        <div className="--secondlevel-parent container">
        <img width='30px' src={SlattLogo} alt="slattlogo" />
          <img className="landing-image" src={Logo} alt="Brand-Name" />
          <img width='30px' src={SlattLogo} alt="slattlogo" />
          <p className="text-white mt-3 press-start">
            Be the first to get notification when <br /> 'PROJEKT PLUTO' <br />{" "}
            is launched
          </p>
          <div className="--input-container">
            <form>
              <input type="email" name="email" ref={inputRef} id="inputField" />{" "}
              &nbsp;&nbsp;
              <button
                onClick={SendEmails}
                className="btn btn-secondary sendBtn"
              >
                Send
              </button>
            </form>
          </div>

          <div className="--slider-box mt-3">
            <Marquee pauseOnHover="true" className="text-white maquee">
              This Community Creative Website by Only1eric (itz_microsoft) is
              for creative and determine young people. It's purpose is to
              empower Nigerian's and youths all over the universe to connect to
              art scene, entertainment and networking around the universe with
              the Nigerian Inspired Music, America Hiphop/Rap Music, Fashion,
              Street+Style, Instinct and Culture. The goal is to showcase the
              Nigerian talents, Art Scene, Street+Style Fashion , Culture (Black
              Lives) and Empower Small Scale Businesses through the Community's
              Website. 🏁Website Design Interface; Reference By GO CRZY 🏁
            </Marquee>
            <div className="text-white mt-5">
              <a
                href="https://youtube.com/@slattlife01?si=U5M16G2ih9CKTIus
              "
              >
                <i className="fab fa-youtube cursor"></i>
              </a>{" "}
              &nbsp;&nbsp;&nbsp;
              <a href="https://www.instagram.com/slattlife.c0m?igsh=cTBvZHlhd2lyMTZn&utm_source=qr">
                <i className="fab fa-instagram  cursor"></i>
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="https://www.tiktok.com/@slattlife.com?is_from_webapp=1&sender_device=pc">
                {" "}
                <i className="fab fa-tiktok cursor"></i>
              </a>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <CountdownTimers />
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
