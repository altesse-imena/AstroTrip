import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  // Add styles for the animated border
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .animated-border {
        position: relative;
        display: inline-block;
        margin-bottom: 2rem;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        overflow: hidden;
      }
      
      .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      
      .animated-border::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top-color: #64dfdf;
        border-right-color: #80ffdb;
        animation: rotate 8s linear infinite;
        z-index: 1;
        pointer-events: none;
      }
      
      .animated-border::after {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-bottom-color: #0077b6;
        border-left-color: #48cae4;
        animation: rotate 12s linear infinite reverse;
        z-index: 1;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="card max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6 text-center">ABOUT ME</h1>
        
        <div className="mb-8 flex flex-col items-center">
          <div className="animated-border" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}>
            <img 
              src="/images/Altesse Passport Photo.jpg" 
              alt="Altesse Imena" 
              className="profile-image"
            />
          </div>
          <div className="text-center max-w-3xl">
            <h2 className="text-2xl mb-4">SPACE ENTHUSIAST & DEVELOPER</h2>
            <p className="text-lg">
              Hello! I'm Altesse Imena, a passionate developer with a deep fascination for space exploration and astronomy.
              AstroTrip is my personal project that combines my love for coding with my interest in the cosmos.
            </p>
          </div>
        </div>
        

        
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-center">TECHNICAL SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-base">
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">Programming Languages</h3>
              <p>Python, JavaScript, TypeScript, Swift, C#</p>
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">Web Development</h3>
              <p>React, Angular, Node.js, Django, FastAPI, HTML, CSS</p>
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">AI & Tools</h3>
              <p>Prompt Engineering, OpenAI API, GPT4All, Core ML, Vision</p>
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">Databases</h3>
              <p>Oracle, MySQL, PostgreSQL, Firebase</p>
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">Cloud Platforms</h3>
              <p>AWS, Google Cloud Platform (GCP)</p>
            </div>
            <div className="bg-black bg-opacity-30 p-3 rounded">
              <h3 className="text-base mb-2 font-bold">Version Control</h3>
              <p>Git, GitHub</p>
            </div>
          </div>
        </div>
        

        
        <div className="mb-8 text-center">
          <a href="https://github.com/altesse-imena" target="_blank" rel="noopener noreferrer" className="btn py-3 px-6 hover:bg-white hover:text-black transition-all text-lg">
            MORE OF MY WORK
          </a>
        </div>
        

      </div>
    </div>
  );
};



export default AboutMe;
