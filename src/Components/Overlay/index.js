import { useDispatch, useSelector } from 'react-redux';
import { getTrailer } from '../../redux/selector';
import clientSlice from '../../redux/clientSlice';
import Trailer from '../Trailer';

function Overlay() {
   const dispatch = useDispatch();
   const trailer = useSelector(getTrailer);
   const handleClick = () => {
      dispatch(clientSlice.actions.toggleOverlay());
      dispatch(clientSlice.actions.setTrailer(''));
   };
   return (
      <div className="overlay" onClick={handleClick}>
         {trailer && <Trailer />}
      </div>
   );
}

export default Overlay;
