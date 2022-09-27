import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import { images } from '../../assets/images';
import styles from './slide.module.scss';

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
   return (
      <button
         style={style}
         onClick={onClick}
         className={className + ' ' + cx('arrow', 'left')}
      >
         <img src={images.ChevronLeft} alt="icon" />
      </button>
   );
}

function compare(a, b) {
   if (a.name < b.name) {
      return -1;
   }
   if (a.name > b.name) {
      return 1;
   }
   return 0;
}

function Slide({ data }) {
   const settings = {
      infinite: false,
      slidesToShow: data.slidesToShow || 6,
      slidesToScroll: data.slidesToScroll || 6,
      nextArrow: <NextArrow />,
      prevArrow: <PreArrow />,
      speed: 800,
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
