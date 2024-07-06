import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

import ReactSlider from "react-slick";

interface SliderProps {
  items: string[];
}

const Slider = ({ items }: SliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: true,
    verticalSwiping: true,
    draggable: false,
    touchMove: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <ReactSlider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          
        </div>
      ))}
    </ReactSlider>
  );
};

export default Slider;