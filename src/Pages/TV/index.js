import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from './tv.module.scss';
import Button from '../../Components/Button';
import { images } from '../../assets/images';
import Slide from '../../Components/Slide';
import Avatar from '../../Components/Avatar';
import TrailerThumbnail from '../../Components/TrailerThumbnail';

const cx = classNames.bind(styles);

const actors = {
   title: 'Diễn viên',
   Component: Avatar,
   data: [
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/wLXCCBQ6f456K2mQtbY8vgiOJoK.jpg',
         name: 'Markella Kavenagh',
         subname: "Elanor 'Nori' Brandyfoot",
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/1Ocb9v3h54beGVoJMm4w50UQhLf.jpg',
         name: 'Joseph Mawle',
         subname: 'Oren',
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/rVc9M8pojcY7aHyKpx3iCZKWYIs.jpg',
         name: 'Morfydd Clark',
         subname: 'Galadriel                      ',
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/opKzRsU5iGJ8GDKO5HwC7ze5KHv.jpg',
         name: 'Tyroe Muhafidin',
         subname: 'Theo',
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/gc6KzZTn6YHkWQt872TCSSgkAFa.jpg',
         name: 'Ian Blackburn',
         subname: 'Rowan',
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/1uMca03gCsZnPPrUaFTn0q4i2Ru.jpg',
         name: 'Anthony Crum',
         subname: '',
      },
      {
         thumbnail:
            'https://image.tmdb.org/t/p/w138_and_h175_face/4zc3iyr3d9DbQW4k1HLkQETY7a1.jpg',
         name: 'Maxine Cunliffe',
         subname: 'Vilma',
      },
   ],
};

const trailers = {
   title: 'trailer',
   Component: TrailerThumbnail,
   slidesToShow: 6,
   slidesToScroll: 6,
   data: [
      'x8UAUAuKNcU',
      'x8UAUAuKNcU',
      'x8UAUAuKNcU',
      'x8UAUAuKNcU',
      'x8UAUAuKNcU',
      'x8UAUAuKNcU',
   ],
};

function TV() {
   return (
      <div className={cx('tv')}>
         <span className={cx('background')}></span>
         <div className={cx('row', 'body')}>
            <div className={cx('col l-3', 'tv-col')}>
               <img
                  src="https://image.tmdb.org/t/p/w342/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
                  alt="thumbnail"
               />
               <Button to={'/watch'} danger large>
                  <FontAwesomeIcon icon={faPlay} />
                  Xem phim
               </Button>
            </div>

            <div className={cx('col l-9', 'tv-col-2')}>
               <h1 className={cx('title')}>
                  The Lord of the Rings: The Rings of Power
               </h1>

               <h3 className={cx('sub-title')}>
                  Chúa tể những chiếc nhẫn: Những Chiếc Nhẫn Quyền Năng
               </h3>

               <div className={cx('duration')}>
                  <b>TV-14</b>
               </div>

               <div className={cx('imbd')}>
                  <img src={images.IMDB} alt="imdb" />
                  <b>6.8</b>
               </div>

               <div className={cx('share-genres')}>
                  <div className={cx('share')}>
                     <Button
                        href={'https://facebook.com/sharer/'}
                        target={'_blank'}
                        facebook
                        medium
                     >
                        <FontAwesomeIcon icon={faSquareFacebook} />
                        <span>Chia sẻ</span>
                     </Button>
                     <Button collection medium>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Bộ sưu tập</span>
                     </Button>
                  </div>
                  <div className={cx('genres')}>
                     <Button to={''} genre>
                        Chinh kich
                     </Button>
                     <Button to={''} genre>
                        Vien tuong {'&'} than thoai
                     </Button>
                     <Button to={''} genre>
                        Hanh dong {'&'} phieu luu
                     </Button>
                  </div>
               </div>

               <div className={cx('info')}>
                  <div className={cx('item')}>
                     <span className={cx('title')}>Sáng lập</span>
                     <div className={cx('value')}>
                        <Link to={''}>John D. Payne</Link>
                        <Link to={''}>, Patrick McKay</Link>
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <span className={cx('title')}>Quốc gia</span>
                     <div className={cx('value')}>
                        <Link to={''}>Mỹ</Link>
                     </div>
                  </div>
                  <div className={cx('item')}>
                     <span className={cx('title')}>KHỞI CHIẾU</span>
                     <div className={cx('value')}>9/1/2022</div>
                  </div>
               </div>

               <div className={cx('description')}>
                  Bộ phim sử thi lấy bối cảnh hàng nghìn năm trước sự kiện trong
                  'The Hobbit' và 'The Lord of the Rings' kể về một nhóm các
                  nhân vật, cả quen lẫn mới, khi họ đối mặt với sự tái xuất hiện
                  đáng sợ của cái ác ở Trung Địa.
               </div>

               <Slide data={actors} />

               <Slide data={trailers} />

               <div className={cx('season')}>
                  <div className={cx('title')}>season</div>
                  <div className={cx('body')}>
                     <img
                        src="https://image.tmdb.org/t/p/w342/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
                        alt="thumbnail"
                     />
                     <div className={cx('info')}>
                        <Link to={''}>Phần 1</Link>
                        <p>2022 - 3 tập</p>
                        <p>
                           Phần 1 của The Lord of the Rings: The Rings of Power
                           được khởi chiếu vào ngày 9/1/2022
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default TV;
