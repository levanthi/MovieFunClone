import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from 'react-redux';
import styles from './watch.module.scss';
import Button from '../../Components/Button';
import VideoControls from '../../Components/VideoControls';
import Axios from '../../Components/Axios';
import { getUser } from '../../redux/selector';
import Comments from '../../Components/Comments';

const cx = classNames.bind(styles);

function Watch() {
   const location = useLocation();
   const user = useSelector(getUser);

   const [data, setData] = useState([]);
   const [currentEp, setCurrentEp] = useState(1);

   const handleEpChange = (ep) => {
      if (ep !== currentEp) {
         setCurrentEp(ep);
      }
   };

   useEffect(() => {
      const movieId = location.pathname.slice(7);
      Axios.get('/movie/watch', { params: { movieId } }).then((res) => {
         setData(res.data);
      });
   }, []);
   return (
      <div>
         <div className={cx('watch')}>
            <VideoControls
               src={data.episodes && data.episodes[currentEp - 1]}
            />
         </div>
         <div className={cx('body', 'container')}>
            <div className={cx('guide')}>
               Phim không có tiếng / mất tiếng nhân vật / âm thanh bị rè?
               <Link className="link" to={'/faq'}>
                  Xem hướng dẫn
               </Link>
            </div>
            <h1 className={cx('name')}>
               {data.name}(phần {data.season})
            </h1>
            <h4 className={cx('sub-name')}>
               {data.subName}(season {data.season}) (
               <Link
                  className="link"
                  to={`/filter?year=${data.year}&currentPage=1`}
               >
                  {data.year}
               </Link>
               )
            </h4>
            <div className={cx('share')}>
               <Button small facebook href={'http://'}>
                  <FontAwesomeIcon icon={faSquareFacebook} />
                  <span>Chia sẻ</span>
               </Button>
            </div>
            <div className={cx('episodes')}>
               {data.episodes?.map((ep, index) => {
                  return (
                     <Button
                        key={index}
                        className={cx({ active: index + 1 === currentEp })}
                        episode
                        onClick={() => {
                           handleEpChange(index + 1);
                        }}
                     >
                        Tập {index + 1}
                     </Button>
                  );
               })}
            </div>
            {user ? (
               <Comments movieId={data._id} />
            ) : (
               <div>
                  Để gửi bình luận phim, vui lòng{' '}
                  <Link className="link" to="/login">
                     đăng nhập
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
}

export default Watch;
