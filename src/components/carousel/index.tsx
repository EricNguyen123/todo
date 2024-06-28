import { Carousel } from 'antd'
import React from 'react'

const contentStyle: React.CSSProperties = {
  margin: '0',
  width: '100%',
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundImage: 'url("/src/assets/banner.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '8px',
};

const CarouselCus = () => {

  return (
    <Carousel
      style={{
        width: '96%',
        margin: '10px auto'
      }}
    >
      <div>
        <h3 style={contentStyle}></h3>
      </div>
    </Carousel>
  )
}

export default CarouselCus
