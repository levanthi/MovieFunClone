import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import { ReactComponent as Inbox } from '../../assets/images/inbox.svg';
import { ReactComponent as Facebook } from '../../assets/images/facebook.svg';
import { ReactComponent as Send } from '../../assets/images/send.svg';

const cx = classnames.bind(styles);

function Footer() {
   return (
      <div className={cx('footer')}>
         <div className={cx('container')}>
            <h3 className={cx('title')}>
               Phim chất lượng cao online của{' '}
               <Link className="link" to={''}>
                  XemPhim
               </Link>{' '}
               khác gì so với các trang phim khác?
            </h3>
            <ul>
               <li>
                  Là phim bluray (reencoded), có độ phân giải thấp nhất là Full
                  HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới
                  độ phân giải HD (720p) là cao nhất
               </li>
               <li>
                  Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 -
                  10 lần phim online thông thường - đây là yếu tố quyết định độ
                  nét của phim (thậm chí còn quan trọng hơn độ phân giải)
               </li>
               <li>
                  Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các
                  trang phim khác (kể cả Youtube)
               </li>
               <li>
                  Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân
                  giải cao
               </li>
               <li>
                  Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ
                  đề của riêng mình để xem online
               </li>
               <li>
                  Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng
                  Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh
                  qua phụ đề phim
               </li>
            </ul>
            <div className={cx('contact')}>
               <Link to="/contact">
                  <Inbox />
               </Link>
               <a
                  target={'_blank'}
                  rel="noreferrer"
                  href="https://www.facebook.com/Xemphim.Original"
               >
                  <Facebook />
               </a>
               <a
                  href="https://t.me/xemphim_official"
                  target={'_blank'}
                  rel="noreferrer"
               >
                  <Send />
               </a>
            </div>
         </div>
      </div>
   );
}

export default Footer;
