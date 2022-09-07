import Header from '../Components/Header';
import Footer from '../Components/Footer';

function DefaultLayout({ children }) {
   return (
      <>
         <Header />
         <div className="body">{children}</div>
         <Footer />
      </>
   );
}

export default DefaultLayout;
