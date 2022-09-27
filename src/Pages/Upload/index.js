import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import axios from '../../Components/Axios';
import styles from './upload.module.scss';

const cx = classNames.bind(styles);

const genres = {
   name: [
      'Âm nhạc',
      'Bí ẩn',
      'Chiến tranh',
      'Chiến tranh & Chính trị',
      'Chính kịch',
      'Gia đình',
      'Giật gân',
      'Hài',
      'Hành động',
      'Hành động & Phiêu lưu',
      'Hoạt hình',
      'Kinh dị',
      'Kỳ ảo',
      'Lãng mạn',
      'Lịch sử',
      'Nói chuyện',
      'Phiêu lưu',
      'Phim dài kỳ',
      'Tài liệu',
      'Thực tế',
      'Tin tức',
      'Tội phạm',
      'Trẻ em',
      'Truyền hình',
      '     Viễn Tây',
      'Viễn tưởng',
      'Viễn tưởng & Thần thoại',
   ],
   value: [
      'am-nhac',
      'bi-an',
      'chien-tranh',
      'chien-tranh-chinh-tri',
      'chinh-kich',
      'gia- dinh',
      'giat-gan',
      'hai',
      'hanh-dong',
      'hanh-dong-phieu-luu',
      'hoat-hinh',
      'kinh-di',
      'ky-ao',
      'lang-man',
      'lich-su',
      'noi-chuyen',
      'phieu-luu',
      'phim-dai-ky',
      'tai-lieu',
      'thuc-te',
      'tin-tuc',
      'toi-pham',
      'tre-em',
      'truyen-hinh',
      'vien-tay',
      'vien-tuong',
      'vien-tuong-than-thoai',
   ],
};
const country = {
   name: [
      'Mỹ',
      'Hàn Quốc',
      'Anh',
      'Pháp',
      'Canada',
      'Hồng Kông',
      'Nhật Bản',
      'Trung Quốc',
      'Đài Loan',
      'Ấn Độ',
      'Thái Lan',
      'Úc',
      'Việt Nam',
      'Đức',
      'Thụy Điển',
      'Ý',
      'Hungary',
      'Ai-len',
      'Malta',
      'New Zealand',
      'Nga',
      'Iceland',
      'Phần Lan',
      'Ma-la-uy',
      'Colombia',
      'Đan Mạch',
      'Bỉ',
      'Tây Ban Nha',
      'Argentina',
      'Hà Lan',
      'Na Uy',
      'Singapore',
      'Ba Lan',
      'Malaysia',
      'Indonesia',
      'Iran',
      'Puerto Rico',
      'Nepal',
      'Bulgaria',
      'Campuchia',
      'Philippines',
      'Thổ Nhĩ Kỳ',
      'Morocco',
      'Brazil',
      'Mexico',
      'Séc',
      'Rumani',
      'Palestine',
      'Kazakhstan',
      'Nam Phi',
   ],
   value: [
      'US',
      'KR',
      'GB',
      'FR',
      'CA',
      'HK',
      'JP',
      'CN',
      'TW',
      'IN',
      'TH',
      'AU',
      'VN',
      'DE',
      'SE',
      'IT',
      'HU',
      'IE',
      'MT',
      'NZ',
      'RU',
      'IS',
      'FI',
      'MW',
      'CO',
      'DK',
      'BE',
      'ES',
      'AR',
      'NL',
      'NO',
      'SG',
      'PL',
      'MY',
      'ID',
      'IR',
      'PR',
      'NP',
      'BG',
      'KH',
      'PH',
      'TR',
      'MA',
      'BR',
      'MX',
      'CZ',
      'RO',
      'PS',
      'KZ',
      'ZA',
   ],
};
const year = {
   name: [
      '2022',
      '2021',
      '2020',
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      'Trước 2012',
   ],
   value: [
      '2022',
      '2021',
      '2020',
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '-2012',
   ],
};
const duration = {
   name: [
      'Dưới 30 phút',
      "30' - 1 tiếng",
      '1 - 1.5 tiếng',
      '1.5 - 2 tiếng',
      '2 - 2.5 tiếng',
      '2.5 - 3 tiếng',
      'Trên 3 tiếng',
   ],
   value: ['0-30', '30-60', '60-90', '90-120', '120-150', '150-180', '180-0'],
};

function Upload() {
   const form = useRef();
   //upload person
   // const handleSubmit = (e) => {
   //    const result = {};
   //    e.preventDefault();
   //    [...form.current.elements].forEach((element) => {
   //       if (element.name) {
   //          result[element.name] = element.value;
   //       }
   //    });
   //    result.photos = result.photos.split(',');
   //    result.movieParticipated = result.movieParticipated.split(',');
   //    console.log(result);
   //    axios.post('/person', result).then((res) => {
   //       console.log(res.data);
   //    });
   // };

   //upload movie
   const [genress, setGenres] = useState([]);
   const handleSubmit = (e) => {
      const result = {};
      e.preventDefault();
      [...form.current.elements].forEach((element) => {
         if (element.name) {
            result[element.name] = element.value;
         }
      });
      result.actors = result.actors.split(',');
      result.foundation = result.foundation.split(',');
      result.trailers = result.trailers.split(',');
      result.episodes = result.episodes.split(',');
      result.genres = genress;
      const countryIndex = country.value.indexOf(result.country);
      result.country = {
         name: country.name[countryIndex],
         value: country.value[countryIndex],
      };
      axios.post('/movie', result).then((res) => console.log(res.data));
   };
   const handleSelect = (e) => {
      const genre = {};
      genre.name = e.target.innerText;
      genre.value = e.target.value;
      setGenres((pre) => [...pre, genre]);
   };

   return (
      //movie
      <div>
         <form ref={form} onSubmit={handleSubmit} className={cx('form')}>
            <div>
               <label>name</label>
               <input name="name" />
            </div>
            <div>
               <label>Subname</label>
               <input name="subName" />
            </div>
            <div>
               <label>type</label>
               <select name="type">
                  <option value="movie">Phim lẻ</option>
                  <option value="show">Phim bộ</option>
               </select>
            </div>
            <div>
               <label>season</label>
               <input name="season" />
            </div>
            <div>
               <label>year</label>
               <select name="year">
                  {year.name.map((name, index) => {
                     return (
                        <option key={index} value={year.value[index]}>
                           {name}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div>
               <label>IMDB</label>
               <input name="IMDB" />
            </div>
            <div>
               <label>genres</label>
               <div style={{ marginTop: '20px' }}>
                  {genress.map((genre) => {
                     return (
                        <span key={genre.value}>
                           <span
                              onClick={() => {
                                 setGenres((pre) => {
                                    return pre.filter((item) => {
                                       return item.value !== genre.value;
                                    });
                                 });
                              }}
                           >
                              X
                           </span>{' '}
                           {genre.name}
                        </span>
                     );
                  })}
               </div>
               <select onClick={handleSelect} name="genres" multiple>
                  {genres.name.map((name, index) => {
                     return (
                        <option key={index} value={genres.value[index]}>
                           {name}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div>
               <label>foundation</label>
               <input name="foundation" />
            </div>
            <div>
               <label>country</label>
               <select name={'country'}>
                  {country.name.map((name, index) => {
                     return (
                        <option key={index} value={country.value[index]}>
                           {name}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div>
               <label>duration</label>
               <input type={'number'} name="duration" />
            </div>
            <div>
               <label>premiere</label>
               <input name="premiere" />
            </div>
            <div>
               <label>description</label>
               <textarea name="description"></textarea>
            </div>
            <div>
               <label>actors</label>
               <textarea name="actors" />
            </div>
            <div>
               <label>trailers</label>
               <textarea name="trailers" />
            </div>
            <div>
               <label>episodes</label>
               <textarea name="episodes" />
            </div>
            <div>
               <label>thumbnail</label>
               <input name="thumbnail" />
            </div>
            <div>
               <label>background</label>
               <input name="background" />
            </div>
            <button>Submit</button>
         </form>
      </div>

      //person
      // <div>
      //    <form onSubmit={handleSubmit} ref={form} className={cx('form')}>
      //       <div>
      //          <label>Name</label>
      //          <input name="name" />
      //       </div>
      //       <div>
      //          <label>story</label>
      //          <textarea name="story"></textarea>
      //       </div>
      //       <div>
      //          <label>thumbnail</label>
      //          <input name="thumbnail" />
      //       </div>
      //       <div>
      //          <label>job</label>
      //          <input name="job" />
      //       </div>
      //       <div>
      //          <label>gender</label>
      //          <input name="gender" />
      //       </div>
      //       <div>
      //          <label>dateOfBirth</label>
      //          <input name="dateOfBirth" />
      //       </div>
      //       <div>
      //          <label>placeOfBirth</label>
      //          <input name="placeOfBirth" />
      //       </div>
      //       <div>
      //          <label>movieParticipated</label>
      //          <textarea name="movieParticipated" />
      //       </div>
      //       <div>
      //          <label>photos</label>
      //          <textarea name="photos" />
      //       </div>
      //       <button>SUBMIT</button>
      //    </form>
      // </div>
   );
}

export default Upload;
