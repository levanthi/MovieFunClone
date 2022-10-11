import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
   faCircleInfo,
   faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import styles from './toastMessage.module.scss';
import clientSlice from '../../redux/clientSlice';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function ToastMessage({ type, id, message }) {
   const dispatch = useDispatch();
   const timerIdRef = useRef();
   let icon = faCircleCheck,
      success,
      info,
      warning,
      error;
   switch (type) {
      case 'success':
         icon = faCircleCheck;
         success = true;
         break;
      case 'info':
         icon = faCircleInfo;
         info = true;
         break;
      case 'warning':
         icon = faCircleExclamation;
         warning = true;
         break;
      case 'error':
         icon = faCircleExclamation;
         error = true;
         break;
      default:
   }

   useEffect(() => {
      timerIdRef.current = setTimeout(() => {
         dispatch(clientSlice.actions.removeToastMessage(id));
      }, 3000);
   }, []);

   const handleClose = (e) => {
      clearTimeout(timerIdRef.current);
      e.target.parentElement.classList.remove('slide-down');
      e.target.parentElement.classList.add('slide-up');
      setTimeout(() => {
         dispatch(clientSlice.actions.removeToastMessage(id));
      }, 300);
   };

   return (
      <div
         className={cx('toast-message', 'slide-down', {
            success,
            info,
            warning,
            error,
         })}
      >
         <div className={cx('type')}>
            <FontAwesomeIcon icon={icon} />
         </div>
         <div className={cx('message')}>{message}</div>
         <div className={cx('close')} onClick={handleClose}>
            &times;
         </div>
      </div>
   );
}

export default ToastMessage;
