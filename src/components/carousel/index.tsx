import { Carousel, Image } from 'antd';
import images from '../../assets';

const CarouselCus = () => {

  return (
    <Carousel
      className="w-[96%] h-[160px] mx-auto my-2 rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-center h-full">
        <Image 
          className="w-full h-full object-cover object-center rounded-lg" 
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={images.banerImage} 
          preview={false}
        />
      </div>
    </Carousel>
  )
}

export default CarouselCus
