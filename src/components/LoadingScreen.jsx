import React from 'react';

const LoadingScreen = ({ message = "LOADING COSMIC DATA..." }) => {
  return (
    <div className="loading-screen">
      <div className="stars"></div>
      <div className="rocket">
        <div className="rocket-body"></div>
        <div className="rocket-window"></div>
        <div className="rocket-fins"></div>
        <div className="rocket-exhaust"></div>
      </div>
      <p className="loading-text">{message}</p>
      
      <style jsx="true">{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          overflow: hidden;
        }
        
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0)),
            radial-gradient(1px 1px at 230px 190px, #ffffff, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 250px 250px;
          animation: twinkle 4s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        .rocket {
          position: relative;
          width: 60px;
          height: 120px;
          margin-bottom: 40px;
          animation: launch 2s ease-in-out infinite;
        }
        
        @keyframes launch {
          0% { transform: translateY(5px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(5px); }
        }
        
        .rocket-body {
          position: absolute;
          top: 0;
          left: 10px;
          width: 40px;
          height: 90px;
          background: linear-gradient(90deg, #0077b6, #48cae4, #0077b6);
          border-radius: 50% 50% 0 0;
        }
        
        .rocket-window {
          position: absolute;
          top: 25px;
          left: 22.5px;
          width: 15px;
          height: 15px;
          background-color: #80ffdb;
          border-radius: 50%;
          border: 2px solid #0077b6;
        }
        
        .rocket-fins {
          position: absolute;
          bottom: 0;
          width: 60px;
          height: 30px;
        }
        
        .rocket-fins:before, .rocket-fins:after {
          content: '';
          position: absolute;
          bottom: 0;
          width: 20px;
          height: 30px;
          background-color: #0077b6;
        }
        
        .rocket-fins:before {
          left: 0;
          border-radius: 0 0 0 100%;
        }
        
        .rocket-fins:after {
          right: 0;
          border-radius: 0 0 100% 0;
        }
        
        .rocket-exhaust {
          position: absolute;
          bottom: -30px;
          left: 15px;
          width: 30px;
          height: 30px;
          background: linear-gradient(to bottom, #ff9e00, #ff0000);
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          animation: flame 0.2s ease-in-out infinite alternate;
        }
        
        @keyframes flame {
          0% { height: 30px; opacity: 0.8; }
          100% { height: 35px; opacity: 1; }
        }
        
        .loading-text {
          margin-top: 20px;
          font-family: 'Roboto Condensed', Arial, sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: #ffffff;
          text-transform: uppercase;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
