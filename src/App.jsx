import React from "react"
import Weather from "./Weather"
import Navbar from "./Navbar"
const App=()=>{
  return(
    <div className="app">
      <Navbar/>
     <Weather/>
    </div>
  )
}
export default App