import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { images } from '../../assets/images';
import styles from './slide.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

// Next Arrow Component
function NextArrow(props) {
   const { onClick, style, className } = props;
   return (
      <button
         style={style}
         onClick={onClick}
         className={className + ' ' + cx('arrow', 'right')}
      >
         <img src={images.ChevronRight} alt="icon" />
      </button>
   );
}

// Prev Arrow Component
function PreArrow(props) {
   const { onClick, style, className } = props;
   const btnRef = useRef();
   useEffect(() => {
      setTimeout(() => {
         btnRef.current.click();
      }, 90);
   }, []);
   return (
      <button
         ref={btnRef}
         style={style}
         onClick={onClick}
         className={className + ' ' + cx('arrow', 'left')}
      >
         <img src={images.ChevronLeft} alt="icon" />
      </button>
   );
}

function Slide({ data, responsive = [] }) {
   const settings = {
      slidesToShow: data.slidesToShow || 6,
      slidesToScroll: data.slidesToScroll || 6,
      nextArrow: <NextArrow />,
      prevArrow: <PreArrow />,
      speed: 800,
      infinite: false,
      responsive,
   };
   return (
      <div className={cx('slide')}>
         <h2 className={cx('title')}> {data.title} </h2>
         <Slider {...settings}>
            {data.data?.map((item, index) => {
               return <data.Component key={index} data={item} />;
            })}
         </Slider>
      </div>
   );
}

export default Slide;
