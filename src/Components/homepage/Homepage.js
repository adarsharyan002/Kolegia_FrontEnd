import  Homenavbar  from './nav_bar/Homenavbar';
import  Header  from './header/Header';
import  Feature  from './feature/Feature';
import  Motive  from './motive/Motive';
import  Feedback  from './feedback/Feedback';
import  Footer  from './footer/Footer';
import './homepage.css';
import { useEffect } from 'react';


const Homepage = () => {

    return ( 
        <div className="homepage-cont">
            <Homenavbar/>
            <Header/>
            <Feature/>
            <Motive/>
            <Feedback/>
            <Footer/>
        </div>
     );
}
 
export default Homepage;