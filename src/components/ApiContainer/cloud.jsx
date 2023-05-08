import axios from "axios";
import React, { useState } from "react";

const CloudContainer = ({ base }) => {
  const [input, setInput] = useState("");
  const [changing, setChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const [link, setLink] = useState("");

  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomNumber = Math.random().toString(36).substring(2, 8); // Generate random base36 string
    const uniqueId = `${timestamp}-${randomNumber}`; // Combine timestamp and random number
    return uniqueId;
  }
  const catchIt1 = (e) => {
    const formDate = new FormData();
    formDate.append("title", e);

    const requestData = formDate;
    const config = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    // const url = "http://localhost:8080/feed/post";
    const url= "https://15.237.108.221:8080/feed/post"
    axios.post(url, requestData, config).then((e) => {
      setLink(e.data.post.image);
    });
  };
  React.useEffect(() => {
    if (check) {
      if (base.length !== 0) {
        setLoading(true); 
        catchIt1(base);
        setLoading(false);
      }
    }
    setCheck(true);
  }, [changing]);

  return (
    <div className="w-[50%] flex flex-col items-center">
      <h1 className="text-[40px] w-[80%] text-[#000] font-mono font-medium text-center mt-[100px] tracking-wide">
        Send the Image to cloud!
      </h1>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="name for the Image?"
        className="w-[400px] h-[44px] px-[10px] text-[#000] font-medium rounded-sm mt-[40px] border-[2px] outline-none border-[#222]"
      />
      <button
        onClick={() => {
          setChanging(!changing);
        }}
        className="w-[400px] h-[45px] rounded-sm hover:bg-[#444] bg-[#222] text-[#fff] flex items-center justify-center text-[15px] font-medium mt-[10px]"
      >
        {loading ? "Sending..." : "Send"}
      </button>
      {link.length !== 0 && (
        <>
        <h4 className="font-bold text-[20px] text-[#000] mt-[40px] w-[70%]" >Link:</h4>
        <a href={link} target="_blank" className="w-[70%] shrink-0 text-[#3333FF] cursor-pointer mt-[10px]  text-[16px] font-medium">{link}</a>
        </>
      )}  
    </div>
  );
};

export default CloudContainer;
