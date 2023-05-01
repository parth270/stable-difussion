import React from "react";

const Home = React.lazy(() => import("../views/index"));

const HomePage = () => {
  return <Home />;
};

export default HomePage;
