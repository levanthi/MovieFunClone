import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from './watch.module.scss';
import Button from '../../Components/Button';
import VideoControls from '../../Components/VideoControls';

const cx = classNames.bind(styles);

const videoUrl =
   'https://scontent.cdninstagram.com/v/t39.25447-2/10000000_491285592831410_8458140508693475276_n.mp4?_nc_cat=101&vs=3d2fd66fdece4bc3&_nc_vs=HBksFQAYJEdJQ1dtQUN5ZFQ1WDByNEJBTXd2Qk1INldXRjFibWRqQUFBRhUAAsgBABUAGCRHSUNXbUFBdE93ZFRaeXdUQUt5M0JQRnc1NWxOYnJGcUFBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATENc3Vic2FtcGxlX2ZwcwAQdm1hZl9lbmFibGVfbnN1YgAgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzABUAJQAcAAAm%2BP%2F7mcC2yQEVkE4oAkMzGAt2dHNfcHJldmlldxwXQK7WgAAAAAAYKWRhc2hfaTRsaXRlYmFzaWNfNXNlY2dvcF9ocTJfZnJhZ18yX3ZpZGVvEgAYGHZpZGVvcy52dHMuY2FsbGJhY2sucHJvZDgSVklERU9fVklFV19SRVFVRVNUGw%2BIFW9lbV90YXJnZXRfZW5jb2RlX3RhZwZvZXBfaGQTb2VtX3JlcXVlc3RfdGltZV9tcwEwDG9lbV9jZmdfcnVsZQd1bm11dGVkE29lbV9yb2lfcmVhY2hfY291bnQBMBFvZW1faXNfZXhwZXJpbWVudAAMb2VtX3JvaV9ub3RlC3Byb2dyZXNzaXZlEW9lbV9yb2lfdXNlcl90aWVyAB5vZW1fcm9pX3ByZWRpY3RlZF93YXRjaF90aW1lX3MBMBZvZW1fcm9pX3JlY2lwZV9iZW5lZml0BTAuMDAwJW9lbV9yb2lfc3RhdGljX2JlbmVmaXRfY29zdF9ldmFsdWF0b3ILcHJvZ3Jlc3NpdmUMb2VtX3ZpZGVvX2lkDzgyODc3NjU2NTE1NzYxNBJvZW1fdmlkZW9fYXNzZXRfaWQQMTA5OTI2NzA0MDY4MzAxNhVvZW1fdmlkZW9fcmVzb3VyY2VfaWQPNDQyOTQwMDA0NDY2Njg0HG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQPMzg3NjE2ODYzNTI3NTM5DnZ0c19yZXF1ZXN0X2lkDzM1OTk3YzVjZWY0ZjRlZCUCHBwcFfDmFxsBVQACGwFVAAIcFQIAAAAWgLq3AwAlxAEbB4gBcwQxMDY5AmNkCjIwMjItMDktMDIDcmNiATADYXBwBVZpZGVvAmN0GUNPTlRBSU5FRF9QT1NUX0FUVEFDSE1FTlQTb3JpZ2luYWxfZHVyYXRpb25fcwczOTQ3LjUyAnRzFXByb2dyZXNzaXZlX2VuY29kaW5ncwA%3D&ccb=1-7&_nc_sid=41a7d5&_nc_ohc=LnatV5Gi9ugAX9NdtRj&_nc_oc=AQnW1K6R7vsD8tOfxzw7985ebxmmZIMHkgrOUtOpmpsF8038ctdfKVtASkH8H-DUC8w&_nc_ht=scontent-dus1-1.xx&edm=APRAPSkEAAAA&oh=00_AT-xW9ywB_g300nHjkJRkd2l_wb0Nw5MzOWhlYXO7V0tBQ&oe=632E9D26&_nc_rid=468820027295216';

function Watch() {
   return (
      <div>
         <div className={cx('watch')}>
            <VideoControls src={videoUrl} />
         </div>
         <div className={cx('body', 'container')}>
            <div className={cx('guide')}>
               Phim không có tiếng / mất tiếng nhân vật / âm thanh bị rè?
               <Link className="link" to={'/faq'}>
                  Xem hướng dẫn
               </Link>
            </div>
            <h1 className={cx('name')}>
               Chúa tể những chiếc nhẫn: Những Chiếc Nhẫn Quyền Năng (phần 1)
            </h1>
            <h4 className={cx('sub-name')}>
               The Lord of the Rings: The Rings of Power (season 1){' '}
            </h4>
            <div className={cx('share')}>
               <Button small facebook href={'http://'}>
                  <FontAwesomeIcon icon={faSquareFacebook} />
                  <span>Chia sẻ</span>
               </Button>
            </div>
            <div className={cx('episodes')}>
               <Button className={cx('active')} episode>
                  Tập 1
               </Button>
               <Button episode>Tập 2</Button>
               <Button episode>Tập 3</Button>
            </div>
            <div>
               Để gửi bình luận phim, vui lòng{' '}
               <Link className="link" to="/login">
                  đăng nhập
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Watch;
