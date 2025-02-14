import React from 'react';
import { Slide } from 'react-slideshow-image';

const responsiveSettings = [
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
];

const images = [
  {
    src: 'https://demos.codezeel.com/prestashop/PRS22/PRS220531/default/img/cms/sub-banner-2.jpg',
    title: 'THE BEST PLACE TO PLAY',
    subTitle: "Xbox Consoles",
    description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD."
  },
  {
    src: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'THE BEST PLACE TO PLAY',
    subTitle: "Xbox Consoles",
    description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD."
  },
  {
    src: 'https://as1.ftcdn.net/v2/jpg/07/95/01/84/1000_F_795018435_5nkOllwtJP9xDYxoIlYq8AwF2NwKmgea.jpg',
    title: 'THE BEST PLACE TO PLAY',
    subTitle: "Xbox Consoles",
    description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD."
  }
];

const LeftSlideShowBannerComp = () => {
  return (
    <div className="slideshow-container">
      <Slide
        scale={1.4}
        arrows={false}
        slidesToScroll={1}
        slidesToShow={1}
        indicators={(index) => (
          <div className="custom-dot" key={index}></div> // Custom dot on image
        )}
        autoplay={true}
        responsive={responsiveSettings}
      >
        {images.map((image, index) => (
          <div key={index} className="slide-item">
            <div className="image-overlay">
              <div className='zoom-image'>
                <img src={image.src} alt={`Slide ${index + 1}`} className="zoom-image image-responsive rounded-md" />
              </div>

              <div className="overlay"></div>
              <div className="slide-text">
                <p className="text-gray-200 font-bold text-xs">{image.title}</p>
                <h2 className="text-2xl font-bold">{image.subTitle}</h2>
                <p className="text-sm">{image.description}</p>
                <button type="button" class="mt-4 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none">
                  Show Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default LeftSlideShowBannerComp;
