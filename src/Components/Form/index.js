import classNames from 'classnames/bind';
import styles from './form.module.scss';
import Button from '../Button';
import { images } from '../../assets/images';

const cx = classNames.bind(styles);

function Form({ data }) {
   const isOr = !!data.otherMethods;
   return (
      <div className={cx('form')}>
         <h1 className={cx('title')}>{data.title}</h1>
         <form>
            {data.fields.map((field) => {
               return (
                  <div className={cx('field')}>
                     <input
                        spellCheck={false}
                        type={field.type}
                        placeholder={field.placeholder}
                     />
                  </div>
               );
            })}
            {data.tick && (
               <div className={cx('field')}>
                  <label htmlFor="tick" className={cx('tick')}>
                     <input type={'checkbox'} id="tick" />
                     <span>{data.tick.name}</span>
                  </label>
               </div>
            )}
            {
               <div className={cx('field')}>
                  <Button classic large>
                     {data.submit.name}
                  </Button>
               </div>
            }
            {isOr && <div className={cx('field', 'or')}></div>}
            {data.otherMethods?.map((method) => {
               return (
                  <div className={cx('field')}>
                     <Button large primary>
                        {method.method === 'google' ? (
                           <img
                              src={images.Google}
                              className={cx('icon')}
                              alt="google"
                           />
                        ) : (
                           ''
                        )}
                        {method.name}
                     </Button>
                  </div>
               );
            })}
         </form>
         <div className={cx('feature')}>
            {data.otherFeatures.map((feature, index) => {
               return (
                  <>
                     {index > 0 && <span className={cx('dot')}>·</span>}
                     <Button to={feature.to} className="link">
                        {feature.name}
                     </Button>
                  </>
               );
            })}
         </div>
      </div>
   );
}

export default Form;
