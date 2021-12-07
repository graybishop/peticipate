import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
const ThankYou = () => {
  let [trickState, setTrickState] = useState(0)
  const duration = 5 * 1000;
  let end = Date.now() + duration;

  useEffect(() => {
    document.title = 'Thank you!';

    const celebrate = () => {
      confetti({
        colors: ['#FF6F00', '#8FD3FF', '#009BFF'],
        particleCount: 3,
        spread: 60,
        angle:60,
        origin: {
          y: 1,
          x: 0
        },
        startVelocity: 90
      });
      confetti({
        colors: ['#FF6F00', '#8FD3FF', '#009BFF'],
        particleCount: 3,
        spread: 60,
        angle:120,
        origin: {
          y: 1,
          x: 1
        },
        startVelocity: 80
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(celebrate);
      }
    };

    celebrate();
  });

  const startCelebrate = () => {
    setTrickState(trickState+1)
    end = Date.now() + duration
  };


  return (
    <div className='bg-body-background-blue'>
      <div className='container mx-auto flex flex-col justify-center items-center gap-6 h-xl max-w-md'>
        <h1 className='text-5xl font-bold'>Thank You</h1>
        <p className='text-lg text-center'>That's our demo. Thanks for your time and let us know if you have any questions!</p>
        <button className='bg-orange-primary text-white p-2 px-4 rounded-lg shadow-lg font-semibold text-lg text-center hover:bg-orange-hover transition-all hover:shadow-none animate-bounce' onClick={startCelebrate}>Click Me</button>
      </div>
    </div>
  );
};

export default ThankYou;