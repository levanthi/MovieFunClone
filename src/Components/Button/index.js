import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({
   genreListView,
   className,
   to,
   href,
   onClick,
   children,
   ...rest
}) {
   let Comp = 'button';
   const props = {};
   if (to) {
      Comp = Link;
      props.to = to;
   } else if (href) {
      Comp = 'a';
      props.href = href;
   }
   return (
      <Comp
         className={cx('wrapper', className, {
            'genre-list-view': genreListView,
            ...rest,
         })}
         {...props}
         onClick={onClick}
      >
         {children}
      </Comp>
   );
}

export default Button;
