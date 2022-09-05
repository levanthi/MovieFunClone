import Header from '../Components/Header';
import Footer from '../Components/Footer';

function DefaultLayout({ children }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   );
}

export default DefaultLayout;
