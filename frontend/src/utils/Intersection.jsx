import React from 'react'

const Intersection = (elements,show) => {
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add(show)
        }
    })
  })
  return elements.forEach((element) => observer.observe(element))

}

export default Intersection
