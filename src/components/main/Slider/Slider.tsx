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
    speed: 500,
    autoplay: false,
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
        <p className="flex items-center text-center h-[120px]" key={index}>
          {item}
        </p>
      ))}
    </ReactSlider>
  );
};

export default Slider;
