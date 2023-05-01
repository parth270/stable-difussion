import React from "react";
import ApiContainer from "../components/ApiContainer";

const Home = () => {
  return (
    <div className="w-[100%] h-[100vh] bg-[#fff]  overflow-hidden">
      <h1 className="text-[40px] text-[#000] font-mono font-medium text-center mt-[100px] tracking-wide">
        Stable Diffusion Api
      </h1>
      <ApiContainer/>
    </div>
  );
};

export default Home;
