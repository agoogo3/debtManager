import React from 'react'
import Hero from '../utils/Hero'
import Feature from '../utils/Feature'
import HowItWorks from '../utils/HowItWorks'
import FAQ from '../utils/FAQ'

const Home = () => {
  return (
    <div className='container middle'>
     <Hero/>
     <Feature/>
     <HowItWorks/>
     <FAQ/>
    </div>
  )
}

export default Home
