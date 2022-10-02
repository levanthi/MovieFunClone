import className from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faPause,
   faVolumeHigh,
   faVolumeMute,
   faExpand,
   faClosedCaptioning,
   faRotateLeft,
   faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import styles from './videoControls.module.scss';
import { images } from '../../assets/images';

const cx = className.bind(styles);

const convertTimer = (input) => {
   input = Math.floor(input);
   let s, m, h;
   s = input % 60;
   input = Math.floor(input / 60); // this is minutes
   m = input % 60;
   input = Math.floor(input / 60); //this is hours
   h = input;
   let result = '';
   //hours
   if (h > 0) {
      result = h + ':';
   }
   //minutes
   if (m >= 10) {
      result = result + `${m}:`;
   } else if (m > 0) {
      result = result + `0${m}:`;
   } else {
      result += '00:';
   }
   //seconds
   if (s >= 10) {
      result += s;
   } else if (s > 0) {
      result += `0${s}`;
   } else {
      result += '00';
   }
   return result;
};
const subtitleLanguages = [
   { name: 'Tiếng việt', key: 'VI' },
   { name: 'Tiếng Anh', key: 'EN' },
];

const speedOptions = [2, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25];

function VideoControls({ src = '' }) {
   const videoRef = useRef();
   const volumeRef = useRef();
   const currentTimeRef = useRef();
   const volumeProcessRef = useRef();
   const processRef = useRef();
   const groupRef = useRef();
   const [isVideoLoaded, setLoaded] = useState(false);
   const [volume, setVolume] = useState(
      JSON.parse(localStorage.getItem('volume')),
   );
   const [playing, setPlaying] = useState(false);
   const [muted, setMuted] = useState(
      JSON.parse(localStorage.getItem('muted')),
   );
   const [speed, setSpeed] = useState(1);

   useEffect(() => {
      videoRef.current.addEventListener('loadeddata', () => {
         setLoaded(true);
      });
   }, []);
   const togglePlay = () => {
      if (videoRef.current) {
         if (playing) {
            videoRef.current.pause();
         } else {
            videoRef.current.play();
         }
         setPlaying((pre) => !pre);
      }
   };
   const handlePre10s = () => {
      if (videoRef.current) {
         if (videoRef.current.currentTime <= 10) {
            videoRef.current.currentTime = 0;
         } else {
            videoRef.current.currentTime -= 10;
         }
      }
   };
   const handleNext10s = () => {
      if (videoRef.current) {
         if (videoRef.current.duration <= videoRef.current.currentTime + 10) {
            videoRef.current.currentTime = videoRef.current.duration;
         } else {
            videoRef.current.currentTime += 10;
         }
      }
   };
   const handleVolumeChange = (e, data) => {
      const volume = data || e?.target.value || 0;
      if (videoRef.current) {
         if (Number(volume) === 0) {
            setMuted(true);
            localStorage.setItem('muted', JSON.stringify(true));
         } else {
            setMuted(false);
            localStorage.setItem('muted', JSON.stringify(false));
         }
         videoRef.current.volume = volume / 100;
         volumeProcessRef.current.style.width = volume + '%';
         setVolume(volume);
         localStorage.setItem('volume', JSON.stringify(volume));
      }
   };
   const handleTimeUpdate = () => {
      if (currentTimeRef.current) {
         currentTimeRef.current.innerHTML = convertTimer(
            videoRef.current.currentTime,
         );
      }
      if (processRef.current) {
         processRef.current.lastChild.style.width =
            (videoRef.current.currentTime / videoRef.current.duration) * 100 +
            '%';
      }
   };
   const handleSpeedChange = (e, value) => {
      e.target.parentElement.classList.add(cx('hidden'));
      setTimeout(() => {
         e.target.parentElement.classList.remove(cx('hidden'));
      }, 50);
      setSpeed(value);
      videoRef.current.playbackRate = value;
   };
   const handleFullscreen = () => {
      if (!groupRef.current.fullscreenElement) {
         groupRef.current.requestFullscreen();
      } else if (groupRef.current.exitFullscreen) {
         groupRef.current.exitFullscreen();
      }
   };
   const handlePicInPic = () => {
      if (document.pictureInPictureElement) {
         document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
         videoRef.current.requestPictureInPicture();
      }
   };
   const handleSubtitle = (e, language) => {
      e.target.parentElement.classList.add(cx('hidden'));
      setTimeout(() => {
         e.target.parentElement.classList.remove(cx('hidden'));
      }, 50);
   };
   const handleMuted = () => {
      if (Number(volume) > 0) {
         handleVolumeChange(undefined, 0);
         localStorage.setItem('preVolume', JSON.stringify(volume));
      } else {
         handleVolumeChange(
            undefined,
            JSON.parse(localStorage.getItem('preVolume')) || 50,
         );
      }
   };
   const handleProcessChange = (e) => {
      const currentTime =
         (Number(e.clientX) * Number(videoRef.current.duration)) /
         Number(processRef.current.offsetWidth);
      //style for process
      processRef.current.lastChild.style.width =
         (currentTime / videoRef.current.duration) * 100 + '%';
      //change currentTime
      videoRef.current.currentTime = currentTime;
   };
   const handleProcessHover = (e) => {
      processRef.current.firstChild.style.left = e.clientX + 'px';
      processRef.current.firstChild.innerHTML = convertTimer(
         (Number(e.clientX) * Number(videoRef.current.duration)) /
            Number(processRef.current.offsetWidth),
      );
   };
   return (
      <div ref={groupRef} className={cx('video-group')}>
         <video
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            ref={videoRef}
            src={src}
            // preload="auto"
         ></video>
         {!playing && <Play onClick={togglePlay} />}
         {isVideoLoaded && (
            <div className={cx('controls-wrap')}>
               <div
                  ref={processRef}
                  className={cx('process-wrap')}
                  onClick={handleProcessChange}
                  onMouseMove={handleProcessHover}
               >
                  <span className={cx('float')}>10:10</span>
                  <div className={cx('track')}></div>
                  <span className={cx('process')}></span>
               </div>
               <div className={cx('controls')}>
                  <div className={cx('left')}>
                     <FontAwesomeIcon
                        onClick={togglePlay}
                        icon={playing ? faPause : faPlay}
                     />
                     <div onClick={handlePre10s} className={cx('pre-10')}>
                        <FontAwesomeIcon icon={faRotateLeft} />
                     </div>
                     <div onClick={handleNext10s} className={cx('next-10')}>
                        <FontAwesomeIcon icon={faRotateRight} />
                     </div>
                     <div className={cx('volume-group')}>
                        <FontAwesomeIcon
                           ref={volumeRef}
                           className={cx('volume')}
                           icon={muted ? faVolumeMute : faVolumeHigh}
                           onClick={handleMuted}
                        />
                        <div className={cx('volume-power')}>
                           <input
                              value={volume || 0}
                              type="range"
                              min={0}
                              max={100}
                              onChange={handleVolumeChange}
                           />
                           <span
                              ref={volumeProcessRef}
                              className={cx('volume-process')}
                           ></span>
                        </div>
                     </div>
                     <div className={cx('timer')}>
                        <div ref={currentTimeRef}>00:00</div>
                        <span>/</span>
                        <div>{convertTimer(videoRef.current.duration)}</div>
                     </div>
                  </div>
                  <div className={cx('right')}>
                     <div className={cx('speed')}>
                        <span>1x</span>
                        <div className={cx('options')}>
                           {speedOptions.map((value) => {
                              return (
                                 <div
                                    key={value}
                                    onClick={(e) => {
                                       handleSpeedChange(e, value);
                                    }}
                                    className={cx({ active: value === speed })}
                                 >
                                    {value}x
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                     <div className={cx('subtitle')}>
                        <FontAwesomeIcon icon={faClosedCaptioning} />
                        <div>
                           {subtitleLanguages.map((language) => {
                              return (
                                 <div
                                    key={language.name}
                                    onClick={(e) => {
                                       handleSubtitle(e, language);
                                    }}
                                 >
                                    {language.name}
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                     <img
                        onClick={handlePicInPic}
                        src={images.picture}
                        alt="pic-in-pic"
                     />
                     <FontAwesomeIcon
                        onClick={handleFullscreen}
                        icon={faExpand}
                     />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
function Play({ onClick }) {
   return (
      <div onClick={onClick} className={cx('play')}>
         <FontAwesomeIcon icon={faPlay} />
      </div>
   );
}

export default VideoControls;
