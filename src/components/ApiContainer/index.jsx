import React, { useState } from "react";
import axios from "axios";

const ApiContainer = () => {
  const [input, setInput] = useState();

  let url = "https://dagk2i0l0yytq4-7860.proxy.runpod.net/sdapi/v1/txt2img/";

  React.useEffect(() => {
    const submit = async () => {
      console.log(input);
      axios
        .post(url, {
          prompt: "gray colored",
          steps: 30,
        })
        .then((e) => {
          console.log(e);
        });
    };
    const payload = {
      prompt: "gray colored",
      steps: 30,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        const image = data.images[0];
        console.log(image);
        // Do something with the image...
      })
      .catch((error) => console.error(error));
    // submit();
  });
  return (
    <div className="w-[100%] flex items-center flex-col justify-center">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Tell me about the Image you desire?"
        className="w-[400px] h-[44px] px-[10px] text-[#000] font-medium rounded-sm mt-[40px] border-[2px] outline-none border-[#222]"
      />
      <button
        // onClick={() => {
        //   submit();
        // }}
        className="w-[400px] h-[45px] rounded-sm hover:bg-[#444] bg-[#222] text-[#fff] flex items-center justify-center text-[15px] font-medium mt-[10px]"
      >
        Generate
      </button>
      <div className="w-[400px] h-[350px] mt-[20px] border-[1.5px] rounded-sm border-[#000]   p-[10px] flex-col flex items-center">
        <h4 className="text-[#000] font-medium text-center uppercase tracking-wide font-mono">
          Result
        </h4>
        <div className="mt-[5px] rounded-sm w-[100%] h-[100%] border-[1.5px] border-[#000] flex items-center justify-center p-[10px]">
          <div className="flex items-center justify-center">
            <img
              src="/image.svg"
              className="w-[24px] h-[24px] mr-[5px] translate-y-[1px]"
              alt=""
            />
            <p className="tracking-wide text-[#000] text-[17px] font-medium">
              {" "}
              Images will Appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApiContainer;
