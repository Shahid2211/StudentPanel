import React from 'react'

export default function GradientTest() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: 'radial-gradient(circle, #5c0067 0%, #00d4ff 100%)' }}>
      <div style={{ width:'200px',height:'100px',color:'white',background: 'linear-gradient(to bottom right, #43cea2, #185a9d)' }}>Hi everyone</div>
      <div style={{ width:'200px',height:'100px',color:'white',background: 'linear-gradient(to right, red, yellow)' }}>This is a gradient background</div>
      <div style={{ width:'200px',height:'100px',color:'white',background: 'linear-gradient(to top right, red,blue)' }}>background</div>
      <div style={{ width:'200px',height:'100px',color:'white',background: 'linear-gradient(to bottom right, green, purple)' }}>background</div>
      <div style={{ width:'200px',height:'100px',color:'white',background: 'linear-gradient(to top left, orange, pink)' }}>background</div>
    </div>
  )
}
