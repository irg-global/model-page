import bed from '../assets/bed.png';
import bike from '../assets/bike.png';
import car from '../assets/car.png';
import dragon from '../assets/dragon.png';
import grout from '../assets/grout.png';
import house from '../assets/house.png';
import house2 from '../assets/house2.png';
import item from '../assets/item.png';
import machineArm from '../assets/machineArm.png';
import spiderman from '../assets/spiderman.png';
import fly from '../assets/fly.png';
import cycle from '../assets/cycle.png';
import watch from '../assets/watch.png';
import car2 from '../assets/car2.png';
import box from '../assets/box.png';
import coin from '../assets/coin.png';
import suzuki from '../assets/suzuki.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Card = () => {
  const images = [
    { src: bed, model: 'bed' },
    { src: car, model: 'car' },
    { src: watch, model: 'watch' },
    { src: bike, model: 'bike' },
    { src: house, model: 'house' },
    { src: house2, model: 'house2' },
    { src: car2, model: 'car2' },
    { src: machineArm, model: 'machineArm' },
    { src: fly, model: 'fly' },
    { src: cycle, model: 'cycle' },
    { src: box, model: 'box' },
    { src: coin, model: 'coin' },
    { src: item, model: 'item' },
    { src: suzuki, model: 'suzuki' },
    { src: spiderman, model: 'spiderman' },
    { src: grout, model: 'grout' },
    { src: dragon, model: 'dragon' },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate cards one by one with a staggered effect
    gsap.fromTo(
      cardsRef.current,
      { x: -400 },
      {
        x: 0,
        duration: 1, // Duration for each card
        stagger: {
          each: 0.4, // Stagger delay between each card
          from: 0, // Start the animation from the first card
        },
        delay: 0.7, // Initial delay for the first card animation
        ease: 'power3.out', // Smooth easing
      }
    );
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {images.map((image, index) => (
        <div
        ref={(el) => (cardsRef.current[index] = el)}
          key={index}
          className="w-24 h-24 bg-white rounded shadow-lg cursor-pointer card relative transition-transform ease-in-out duration-300 hover:translate-y-3 hover:text-center"
        >
          {/* Image Container */}
          <div className="z-10 relative flex flex-col items-center group">
            <img
              src={image.src}
              alt="placeholder"
              className="w-24 h-20 transition-transform ease-in-out duration-300 group-hover:scale-150"
            />
          </div>
          <div className="absolute top-2 right-0">
            <div className="bg-[#00673c] py-[1px] rounded-s-lg w-12 text-center">
              <span className="text-sm font-semibold text-white">FREE</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
