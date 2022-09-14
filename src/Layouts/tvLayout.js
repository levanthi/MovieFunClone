import Header from '../Components/Header';
import Footer from '../Components/Footer';

function TvLayout({ children }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   );
}

export default TvLayout;
