import classnames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import styles from './filter.module.scss';
import { images } from '../../assets/images';

const cx = classnames.bind(styles);

const filterList = [
   {
      title: 'Loại phim',
      data: ['Phim lẻ', 'Phim bộ'],
      value: ['movie', 'show'],
      name: 'type',
   },
   {
      name: 'genre',
      title: 'Thể loại',
      data: [
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
   },
   {
      name: 'country',
      title: 'Quốc gia',
      data: [
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
   },
   {
      name: 'year',
      title: 'Năm',
      data: [
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
   },
   {
      name: 'duration',
      title: 'Thời Lượng',
      data: [
         'Dưới 30 phút',
         "30' - 1 tiếng",
         '1 - 1.5 tiếng',
         '1.5 - 2 tiếng',
         '2 - 2.5 tiếng',
         '2.5 - 3 tiếng',
         'Trên 3 tiếng',
      ],
      value: [
         '0-30',
         '30-60',
         '60-90',
         '90-120',
         '120-150',
         '150-180',
         '180-0',
      ],
   },
   {
      title: 'Sắp xếp',
      data: ['Ngày cập nhật', 'Ngày phát hành', 'Điểm đánh giá'],
      default: true,
      value: ['updated', 'publishDate', 'rating'],
      name: 'sort',
   },
];

function Filter({ view, setViewList }) {
   const viewRef = useRef();
   const [filterObj, setFilterObj] = useState({
      type: '',
      genre: '',
      country: '',
      year: '',
      duration: '',
      sort: 'publishDate',
   });
   const [filterListState, setFilterList] = useState(filterList);
   const location = useLocation();
   useEffect(() => {
      //type = movie is not have duration filter
      if (location.pathname === '/type/show') {
         let newFilterList = filterListState.filter(
            (filter) => filter.name !== 'duration',
         );
         setFilterList(newFilterList);
      } else {
         setFilterList(filterList);
      }
   }, [location]);
   const handleFilter = (e) => {
      // const newFilterObj = { ...filterObj, [e.target.name]: e.target.value };
      //call API and handle data at here

      setFilterObj((pre) => ({ ...pre, [e.target.name]: e.target.value }));
   };
   const viewChange = () => {
      if (viewRef.current.classList.contains('view-list')) {
         viewRef.current.classList.remove('view-list');
      } else {
         viewRef.current.classList.add('view-list');
      }
      setViewList((pre) => !pre);
   };
   return (
      <div className={cx('filter')}>
         {filterListState.map((filter, index) => {
            return (
               <div key={index} className={cx('filter-item')}>
                  <h4 className={cx('title')}>{filter.title}:</h4>
                  <div className={cx('select-wrap')}>
                     <span className={cx('arrow-down')}></span>
                     <select
                        name={filter.name}
                        onChange={handleFilter}
                        className={cx('select')}
                     >
                        {filter.default || <option selected>- Tất cả -</option>}
                        {filter.data.map((option, index) => {
                           return (
                              <option key={index} value={filter.value[index]}>
                                 {option}
                              </option>
                           );
                        })}
                     </select>
                  </div>
               </div>
            );
         })}
         {view && (
            <div className={cx('view-toggle')}>
               <h4 className={cx('title')}>Hiển thị:</h4>
               <div ref={viewRef} className="view-list">
                  <FontAwesomeIcon onClick={viewChange} icon={faListUl} />
                  <img onClick={viewChange} src={images.grid} alt="grid" />
               </div>
            </div>
         )}
      </div>
   );
}

export default Filter;
