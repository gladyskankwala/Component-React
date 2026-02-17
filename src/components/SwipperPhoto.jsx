import { Swiper ,SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";



const panels =[
    {
        img: "https://images.unsplash.com/photo-1665042099439-39d93c1117e6?q=80&w=1156",
        title: "Hallowin"
    },
    {
        img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1170",
        title: "Tokyo Night"
    },
    {
        img: "https://images.unsplash.com/photo-1666153184660-a09d73e5b755?q=80&w=1170",
        title: "Fire Force"
    }
]

const extentedPanels = [...panels, ...panels, ...panels]


function SwipperPhoto() {

    return(
        <div>
         <Swiper
          modules={[Navigation, Autoplay]}
          loop
          centeredSlides
          slidesPerView={1.5}
          spaceBetween={20}
          autoplay = {{delay: 1000,  disableOnInteraction: false}}
          navigation
          className="slides"
         >
            {extentedPanels.map((panel, i) => (
                <SwiperSlide key={i}>
                    <div className="panel" style={{backgroundImage: `url(${panel.img})`}}>{panel.title}</div>
                </SwiperSlide>
            ))}
         </Swiper>
        </div>
    )

}

export default SwipperPhoto
