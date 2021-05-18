import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import Header from '../Header';
import Footer from '../Footer';
import Card from './Card';
import './landingPg.scss';

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';

import lap1 from '../../assets/laps/lap1.jpg';
import lap2 from '../../assets/laps/lap2.jpg';
import lap3 from '../../assets/laps/lap3.jpg';
import lap4 from '../../assets/laps/lap4.jpg';

import mobile1 from '../../assets/mobiles/mobile1.jpg';
import mobile2 from '../../assets/mobiles/mobile2.jpg';
import mobile3 from '../../assets/mobiles/mobile3.jpg';
import mobile4 from '../../assets/mobiles/mobile4.jpg';

import camera1 from '../../assets/cameras/camera1.jpg';
import camera2 from '../../assets/cameras/camera2.jpg';
import camera3 from '../../assets/cameras/camera3.jpg';
import camera4 from '../../assets/cameras/camera4.jpg';

import speaker1 from '../../assets/speakers/speaker1.jpg';
import speaker2 from '../../assets/speakers/speaker2.jpg';
import speaker3 from '../../assets/speakers/speaker3.jpg';
import speaker4 from '../../assets/speakers/speaker4.jpg';

import tv1 from '../../assets/tvs/tv1.jpg';
import tv2 from '../../assets/tvs/tv2.jpg';
import tv3 from '../../assets/tvs/tv3.jpg';
import tv4 from '../../assets/tvs/tv4.jpg';

import wm1 from '../../assets/wms/wm1.jpg';
import wm2 from '../../assets/wms/wm2.jpg';
import wm3 from '../../assets/wms/wm3.jpg';
import wm4 from '../../assets/wms/wm4.jpg';
const LandingPg = (props) => {
  const laps = [
    { item: lap1, name: 'Macbooks' },
    { item: lap2, name: 'Touch laptops' },
    { item: lap3, name: 'Gaming laptops' },
    { item: lap4, name: 'For professionals' },
    { title: 'LAPTOPS' },
  ];
  const mobiles = [
    { item: mobile1, name: 'iphone 12 pro' },
    { item: mobile2, name: 'oneplus 8T' },
    { item: mobile3, name: 'Samsung galaxy ' },
    { item: mobile4, name: 'For gamers' },
    { title: 'MOBILES' },
  ];
  const cameras = [
    { item: camera1, name: 'Canon cameras' },
    { item: camera2, name: 'nikon cameras' },
    { item: camera3, name: 'Sony cameras ' },
    { item: camera4, name: 'Lumix cameras' },
    { title: 'CAMERAS' },
  ];
  const speakers = [
    { item: speaker1, name: 'Sony hometheater' },
    { item: speaker2, name: 'Bose' },
    { item: speaker3, name: 'SkullCandy ' },
    { item: speaker4, name: 'Senhiser' },
    { title: 'SPEAKERS' },
  ];
  const tvs = [
    { item: tv1, name: 'Apple tv+' },
    { item: tv2, name: 'Sony tvs' },
    { item: tv3, name: 'LG tvs ' },
    { item: tv4, name: 'Samsung tvs' },
    { title: 'TVS' },
  ];
  const wms = [
    { item: wm1, name: 'Front load' },
    { item: wm2, name: 'Top load' },
    { item: wm3, name: 'Semi automatic' },
    { item: wm4, name: 'Fully automatic' },
    { title: 'WASHING MACHINES' },
  ];

  return (
    <div>
      <Header />
      <Carousel
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showThumbs={false}
        stopOnHover={false}
        swipeable={true}
        useKeyboardArrows={true}
        transitionTime={800}
        showArrows={false}
      >
        <div className="slide">
          <img src={slide1} alt="slide1" className="slide_img" />
          <div className="slide_shade"></div>
          <div className="slide_text">
            we <br /> provide
            <br /> quality
            <br />
            products
          </div>
        </div>

        <div className="slide">
          <img src={slide2} alt="slide2" className="slide_img" />
          <div className="slide_shade"></div>
          <div className="slide_text">
            Hassel <br /> free
            <br /> shopping
            <br />
            experience
          </div>
        </div>
        <div className="slide">
          <img src={slide3} alt="slide2" className="slide_img" />
          <div className="slide_shade"></div>
          <div className="slide_text">
            Awesome <br /> products,
            <br /> No Nonsense
          </div>
        </div>
      </Carousel>
      <div className="cards-container">
        <Card obj={laps} />
        <Card obj={mobiles} />
        <Card obj={cameras} />
        <Card obj={speakers} />
        <Card obj={tvs} />
        <Card obj={wms} />
      </div>
      <Footer />
    </div>
  );
};
export default LandingPg;
