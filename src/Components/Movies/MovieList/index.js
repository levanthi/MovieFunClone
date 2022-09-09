import classNames from 'classnames/bind';
import styles from './movieList.module.scss';
import MovieItem from '../MovieItem';

const cx = classNames.bind(styles);

const testData = [
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
      duration: '96 phút',
      country: 'Nhật bản',
      description:
         'Đội quân Ruy Băng Đỏ đã bị Son Goku tiêu diệt. Thế nhưng, những kẻ kế nghiệp của chúng đã tạo ra hai chiến binh Android mới là Gamma 1 và Gamma 2. Hai Android này tự nhận mình là “Siêu anh hùng”. Chúng bắt đầu tấn công Piccolo và Gohan… Mục tiêu của Đội quân Ruy Băng Đỏ mới này là gì? Trước nguy cơ cận kề, đã đến lúc các siêu anh hùng thực thụ phải thức tỉnh!',
      genres: ['Bí ẩn', 'Hoạt hình', 'Viễn tưởng', 'hành động'],
      rating: 7.3,
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
      duration: '96 phút',
      country: 'Nhật bản',
      description:
         'Đội quân Ruy Băng Đỏ đã bị Son Goku tiêu diệt. Thế nhưng, những kẻ kế nghiệp của chúng đã tạo ra hai chiến binh Android mới là Gamma 1 và Gamma 2. Hai Android này tự nhận mình là “Siêu anh hùng”. Chúng bắt đầu tấn công Piccolo và Gohan… Mục tiêu của Đội quân Ruy Băng Đỏ mới này là gì? Trước nguy cơ cận kề, đã đến lúc các siêu anh hùng thực thụ phải thức tỉnh!',
      genres: ['Bí ẩn', 'Hoạt hình', 'Viễn tưởng', 'hành động'],
      rating: 7.3,
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
      duration: '96 phút',
      country: 'Nhật bản',
      description:
         'Đội quân Ruy Băng Đỏ đã bị Son Goku tiêu diệt. Thế nhưng, những kẻ kế nghiệp của chúng đã tạo ra hai chiến binh Android mới là Gamma 1 và Gamma 2. Hai Android này tự nhận mình là “Siêu anh hùng”. Chúng bắt đầu tấn công Piccolo và Gohan… Mục tiêu của Đội quân Ruy Băng Đỏ mới này là gì? Trước nguy cơ cận kề, đã đến lúc các siêu anh hùng thực thụ phải thức tỉnh!',
      genres: ['Bí ẩn', 'Hoạt hình', 'Viễn tưởng', 'hành động'],
      rating: 7.3,
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
      duration: '96 phút',
      country: 'Nhật bản',
      description:
         'Đội quân Ruy Băng Đỏ đã bị Son Goku tiêu diệt. Thế nhưng, những kẻ kế nghiệp của chúng đã tạo ra hai chiến binh Android mới là Gamma 1 và Gamma 2. Hai Android này tự nhận mình là “Siêu anh hùng”. Chúng bắt đầu tấn công Piccolo và Gohan… Mục tiêu của Đội quân Ruy Băng Đỏ mới này là gì? Trước nguy cơ cận kề, đã đến lúc các siêu anh hùng thực thụ phải thức tỉnh!',
      genres: ['Bí ẩn', 'Hoạt hình', 'Viễn tưởng', 'hành động'],
      rating: 7.3,
   },
   {
      thumbnail:
         'https://image.tmdb.org/t/p/w342/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
      name: 'Gia Tộc Rồng',
      rawName: 'House of the Dragon',
      duration: '96 phút',
      country: 'Nhật bản',
      description:
         'Đội quân Ruy Băng Đỏ đã bị Son Goku tiêu diệt. Thế nhưng, những kẻ kế nghiệp của chúng đã tạo ra hai chiến binh Android mới là Gamma 1 và Gamma 2. Hai Android này tự nhận mình là “Siêu anh hùng”. Chúng bắt đầu tấn công Piccolo và Gohan… Mục tiêu của Đội quân Ruy Băng Đỏ mới này là gì? Trước nguy cơ cận kề, đã đến lúc các siêu anh hùng thực thụ phải thức tỉnh!',
      genres: ['Bí ẩn', 'Hoạt hình', 'Viễn tưởng', 'hành động'],
      rating: 7.3,
   },
];

function MovieList({ movieList = testData || [], list }) {
   return (
      <div className={cx('movie-list') + ' row'}>
         {movieList.map((movie, index) => {
            return <MovieItem key={index} data={movie} list={list} />;
         })}
      </div>
   );
}

export default MovieList;
