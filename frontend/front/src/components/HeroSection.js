import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='http://localhost:3000/backend/public/imgs/video-4.mp4' autoPlay loop muted />
      <h1 color='white'>MERKUR</h1>
      <p>Efikasno Rešava Kupovinu u Radnjama</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          <i className='fa fa-question' /> Uputstvo za korišćenje
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;