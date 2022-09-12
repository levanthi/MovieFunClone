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
            {/* this is input fields */}
            {data.fields.map((field) => {
               return (
                  <div key={field.placeholder} className={cx('field')}>
                     <input
                        spellCheck={false}
                        type={field.type}
                        placeholder={field.placeholder}
                     />
                  </div>
               );
            })}
            {/* this is checkbox */}
            {data.tick && (
               <div className={cx('field')}>
                  <label htmlFor="tick" className={cx('tick')}>
                     <input type={'checkbox'} id="tick" />
                     <span>{data.tick.name}</span>
                  </label>
                  {data.tick.description && (
                     <span className={cx('tick-desc')}>
                        {data.tick.description}
                     </span>
                  )}
               </div>
            )}
            {/* This is submit button */}
            {
               <div className={cx('field')}>
                  <Button classic large>
                     {data.submit.name}
                  </Button>
               </div>
            }
            {/* Or separate */}
            {isOr && <div className={cx('field', 'or')}></div>}
            {/* These are other login method */}
            {data.otherMethods?.map((method) => {
               return (
                  <div key={method.method} className={cx('field')}>
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
         {/* These are other feature ( forgot password...) */}
         <div className={cx('feature')}>
            {data.otherFeatures.map((feature, index) => {
               return (
                  <span key={index}>
                     {index > 0 && <span className={cx('dot')}>·</span>}
                     <Button to={feature.to} className="link">
                        {feature.name}
                     </Button>
                  </span>
               );
            })}
         </div>
      </div>
   );
}

export default Form;
