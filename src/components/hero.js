import React from "react";

const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf7umuBzPOxKSRiFUsrfKOtVrN4K8vVCfuiA&usqp=CAU";

const Hero = () => (
  <div className="text-center hero">
    <img className="mb-3 app-logo" src={logo} alt="Pizza logo" width="120" />
    <h1 className="mb-4">Pizza 42</h1>
    <p className="lead">
      The best pizza in town! What are you waiting for? 
    </p>
  </div>
);

export default Hero;
