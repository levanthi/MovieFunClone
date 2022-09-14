import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from './trailerThumbnail.module.scss';

const cx = classNames.bind(styles);

//  Get thumbnail youtube video from embed
function getThumbnail(embed) {
   let videoId = embed.slice(embed.indexOf('https://'));
   videoId = videoId.slice(0, videoId.indexOf('"'));
   videoId = videoId.slice(videoId.lastIndexOf('/') + 1);
   return videoId;
}

function TrailerThumbnail({ data }) {
   const videoID = getThumbnail(data);
   const [openTrailer, setOpenTrailer] = useState(false);
   const handleClick = () => {
      setOpenTrailer((pre) => !pre);
   };
   return (
      <>
         <div className={cx('thumbnail')} onClick={handleClick}>
            <img
               alt="thumbnail"
               src={`https://img.youtube.com/vi/${videoID}/0.jpg`}
            />
            <FontAwesomeIcon icon={faPlay} />
         </div>
      </>
   );
}

export default TrailerThumbnail;
