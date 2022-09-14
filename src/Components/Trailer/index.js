import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import styles from './trailer.module.scss';
import { getTrailer } from '../../redux/selector';

const cx = classNames.bind(styles);

function Trailer() {
   const ID = useSelector(getTrailer);
   const opts = {
      height: '563',
      width: '1000',
      playerVars: {
         autoplay: 1,
      },
   };
   useEffect(() => {}, []);
   return <YouTube className={cx('trailer')} videoId={ID} opts={opts} />;
}

export default Trailer;
