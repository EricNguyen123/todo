import { Carousel, Image } from 'antd';
import images from '../../assets';

const CarouselCus = () => {

  return (
    <Carousel
      className="w-content h-carousel mx-auto my-2 rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-center h-full">
        <Image 
          className="w-full h-full object-cover object-center rounded-lg" 
          src={images.banerImage} 
          preview={false}
        />
      </div>
    </Carousel>
  )
}

export default CarouselCus
