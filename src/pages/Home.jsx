import React from 'react'

function Home() {
  return (
    <div>
      <h1 className="text-6xl">Welcome</h1>
      {process.env.ACCESS_TOKEN}
    </div>
  )
}

export default Home
