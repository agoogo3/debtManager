import React from 'react'

const Footer = () => {
  const date = new Date()
  
  return (
    <div>
      &copy; {date.getFullYear()} Finledger. All Rights Reserved
    </div>
  )
}

export default Footer
