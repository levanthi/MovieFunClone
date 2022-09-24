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

function Slide({ data }) {
   const settings = {
      infinite: false,
      slidesToShow: data.slidesToShow,
      slidesToScroll: data.slidesToScroll,
      nextArrow: <NextArrow />,
      prevArrow: <PreArrow />,
   };
   return (
      <div className={cx('slide')}>
         <h2 className={cx('title')}> {data.title} </h2>
         <Slider {...settings}>
            {data.data.map((item, index) => {
               return <data.Component key={index} data={item} />;
            })}
         </Slider>
      </div>
   );
}

export default Slide;
