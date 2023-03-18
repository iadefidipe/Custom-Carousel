import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const CustomCarousel = ({ children }) => {

  const slider = useRef(null);
  const [scrollPos, setScrollPos] = useState(0); // new state to track scroll position

  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft = scrollLeft.current - walk;

    // update scrollPos state with new scroll position
    setScrollPos(slider.current.scrollLeft);
  }

  const handleMouseUp = () => {
    isDown.current = false;
  }

  const handleMouseLeave = () => {
    isDown.current = false;
  }

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener("mousedown", handleMouseDown);
      sliderRef.addEventListener("mousemove", handleMouseMove);
      sliderRef.addEventListener("mouseup", handleMouseUp);
      sliderRef.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        sliderRef.removeEventListener("mousedown", handleMouseDown);
        sliderRef.removeEventListener("mousemove", handleMouseMove);
        sliderRef.removeEventListener("mouseup", handleMouseUp);
        sliderRef.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className='flex flex-col gap-4' >
      <div className='custom_carousel scroll-none' ref={slider}>
        {children}
      </div>
      <div className="  flex items-center justify-center  " >
      <input
          type="range"
          min="0"
          max={slider.current?.scrollWidth - slider.current?.offsetWidth}
          value={scrollPos} // bind value to the scrollPos state
          onChange={(e) => {
            slider.current.scrollLeft = e.target.value;
            setScrollPos(slider.current.scrollLeft);
          }}
          className=" h-4 cursor-pointer rounded-full appearance-none bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
    </div>
  )
}

CustomCarousel.propTypes = {
  children: PropTypes.node.isRequired,
}
