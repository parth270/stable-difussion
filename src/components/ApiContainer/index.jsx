import React, { useState } from "react";
import axios from "axios";
import CloudContainer from "./cloud";

const ApiContainer = () => {
  const [input, setInput] = useState("");
  const [images, setImages] = useState();
  const [changing, setChanging] = useState();
  const [basee, setBasee] = useState("");
  const [loading, setLoading] = useState(false);

  const catchAnother = async (blobUrl) => {
    fetch(blobUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          const base64data = reader.result;
          console.log(base64data);
          setBasee(base64data);
        };
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  React.useEffect(() => {
    const catchIt = () => {
      setLoading(true);
      const url =
        "https://i44qfg7p5z4yyn-7861.proxy.runpod.net/sdapi/v1/txt2img";

      const requestData = {
        prompt: input,
        steps: 30,
      };

      const config = {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      };

      axios
        .post(url, requestData, config)
        .then((response) => {
          console.log(response.data);
          const image = response.data.images[0];
          const imageBytes = window.atob(image);
          const imageData = new Uint8Array(imageBytes.length);
          for (let i = 0; i < imageBytes.length; i++) {
            imageData[i] = imageBytes.charCodeAt(i);
          }
          const blob = new Blob([imageData], { type: "image/jpg" });
          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(imageUrl);
            console.log(imageUrl);
          };
          img.src = imageUrl;
          // catchAnother(image);
          // catchIt1(image)

          // catchAnother(imageUrl);
          // setBasee(imageUrl);
          catchAnother(imageUrl);

          setImages(imageUrl);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (input.length !== 0) {
      catchIt();
    }
  }, [changing]);

  console.log(basee);
  return (
    <div className="w-[100%] flex">
      <div className="w-[50%] flex items-center flex-col justify-center">
        <h1 className="text-[40px] text-[#000] font-mono font-medium text-center mt-[100px] tracking-wide">
          Stable Diffusion Api
        </h1>
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
          onClick={() => {
            setChanging(!changing);
          }}
          className="w-[400px] h-[45px] rounded-sm hover:bg-[#444] bg-[#222] text-[#fff] flex items-center justify-center text-[15px] font-medium mt-[10px]"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <div className="w-[400px] h-[350px] mt-[20px] border-[1.5px] rounded-sm border-[#000]   p-[10px] flex-col flex items-center">
          <h4 className="text-[#000] h-[50px] font-medium text-center uppercase tracking-wide font-mono">
            Result
          </h4>
          <div className="mt-[5px] rounded-sm w-[100%] h-[300px] border-[1.5px] border-[#000] flex items-center justify-center p-[10px]">
            {images ? (
              <img
                src={images}
                className="w-[100%] h-[100%] object-contain "
                alt=""
              />
            ) : (
              <div className="flex items-center justify-center">
                <img
                  src="/image.svg"
                  className="w-[24px] h-[24px] mr-[5px] translate-y-[1px]"
                  alt=""
                />
                <p className="tracking-wide text-[#000] text-[17px] font-medium">
                  Images will Appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <CloudContainer base={basee} />
    </div>
  );
};
export default ApiContainer;
