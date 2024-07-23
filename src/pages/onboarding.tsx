import React, { useState } from 'react';
import Slider from 'react-slick';
import Button from '../components/shared/Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ob1 from '../assets/Ob1.png';
import ob2 from '../assets/Ob2.png';
import ob3 from '../assets/Ob3.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setInitialize } from '../store/signupSlice';

interface Page {
  title: string;
  image: string;
  buttonText: string;
}

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const pages: Page[] = [
    {
      title: '매일 일기를 작성하면',
      image: ob1,
      buttonText: '다음',
    },
    {
      title: 'AI가 분석하고',
      image: ob2,
      buttonText: '다음',
    },
    {
      title: '한눈에 정리해줘요',
      image: ob3,
      buttonText: '시작하기',
    },
  ];

  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-dots-custom',
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '0px',
  };

  const sliderRef = React.useRef<Slider>(null);

  const handleNextClick = () => {
    if (currentSlide < pages.length - 1) {
      sliderRef.current?.slickNext();
    }else{
      dispatch(setInitialize());
      navigate('/regist');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mt-32">
        {pages[currentSlide].title}
      </h1>
      <div className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
        <Slider {...settings} ref={sliderRef}>
          {pages.map((page, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <img
                src={page.image}
                alt={page.title}
                className="w-3/4 max-w-xs mx-auto mb-10 rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full max-w-md mx-auto mb-32">
        <div className="flex flex-col items-center space-y-2">
          <Button fullWidth onClick={handleNextClick}>
            {pages[currentSlide].buttonText}
          </Button>
          <Button 
            fullWidth 
            onClick={handleLoginClick} 
            variant="outlined"
            className={`${currentSlide < 2 ? 'invisible' : 'visible'}`}
          >
            이미 계정이 있으신가요? 로그인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;