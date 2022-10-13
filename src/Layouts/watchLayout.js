import Header from '~/Components/Header';
import Footer from '~/Components/Footer';

function WatchLayout({ children }) {
   return (
      <div>
         <Header />
         {children}
         <Footer />
      </div>
   );
}

export default WatchLayout;
