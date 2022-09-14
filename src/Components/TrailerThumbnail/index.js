import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from './trailerThumbnail.module.scss';
import clientSlice from '../../redux/clientSlice';

const cx = classNames.bind(styles);

function TrailerThumbnail({ data }) {
   const dispatch = useDispatch();
   const handleClick = () => {
      dispatch(clientSlice.actions.toggleOverlay());
      dispatch(clientSlice.actions.setTrailer(data));
   };
   return (
      <>
         <div className={cx('thumbnail')} onClick={handleClick}>
            <img
               alt="thumbnail"
               src={`https://img.youtube.com/vi/${data}/0.jpg`}
            />
            <FontAwesomeIcon icon={faPlay} />
         </div>
      </>
   );
}

export default TrailerThumbnail;
