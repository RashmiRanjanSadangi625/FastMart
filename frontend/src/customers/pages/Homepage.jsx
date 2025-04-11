import React, { useEffect } from 'react'
import Carousel from '../../customers/components/Carousel/Carousel'
import ProductCarousel from '../../customers/components/Carousel/ProductCarousel'
import { mens_kurta } from '../../Data/men_kurta'
import { womenTops } from '../../Data/women_top'
import { jeans } from '../../Data/men_jeans'

import { getAllProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from 'react-redux';
import Testimonials from '../components/Testimonial/Testimonials'
import BrandCarousel from '../components/Carousel/BrandCarousel'



const Homepage = () => {  
  return (
    <>
    <Carousel/>
    <BrandCarousel/>
    <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
          <ProductCarousel data={mens_kurta} sectionName={"Men's Kurta"}/>       
          <ProductCarousel data={womenTops} sectionName={"Women's Top"}/>
          <ProductCarousel data={jeans} sectionName={"Jeans"}/>
    </div>
    <div>
      <Testimonials/>
    </div>
    </>
  )
}

export default Homepage