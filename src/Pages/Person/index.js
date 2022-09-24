import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import axios from '../../Components/Axios';
import styles from './person.module.scss';
import MovieList from '../../Components/Movies/MovieList';

const cx = classNames.bind(styles);

function Person() {
   const location = useLocation();
   const [person, setPerson] = useState({});
   const storyRef = useRef();
   useEffect(() => {
      axios
         .get(location.pathname)
         .then((res) => {
            setPerson(res.data);
            return res.data;
         })
         // add some <br/> tag in story
         .then((res) => {
            storyRef.current.innerHTML = res.story;
         });
   }, []);
   console.log(person);
   return (
      <div className={cx('person', 'row', 'container')}>
         <div className={cx('l-3', 'left')}>
            <img alt="thumbnail" src={person.thumbnail} />
            <h3>Thông tin cá nhân</h3>
            <h4>Nghề nghiệp</h4>
            <span>Diễn viên</span>
            <h4>Giới tính </h4>
            <span>Nam</span>
            <h4>Ngày sinh</h4>
            <span>9/4/1974</span>
            <h4>Nơi sinh</h4>
            <span>Buton-on-Trent, Staffordshire, England, UK</span>
         </div>
         <div className={cx('l-9', 'right')}>
            <h1>{person.name}</h1>
            <h3>Tiểu sử</h3>
            <p ref={storyRef}></p>
            <h3>Các phim đã tham gia</h3>
            <MovieList className={'l-3'} />
            <h3>Ảnh</h3>
            <div className={cx('photo-group')}>
               {person.photos?.map((url) => {
                  return (
                     <img key={url} className="l-3" src={url} alt="avatar" />
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Person;
