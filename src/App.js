import React, {useState } from 'react'
import NavBar from './components/NavBar'
import News  from './components/News'
import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 6;
  const [progress, setProgress] = useState(0)

 const apiKey = 'b4faa3f1494b462ca467020db9912074'

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
      />
          <Routes>
            <Route path='/' element={<News setProgress = {setProgress} key='general' pageSize={pageSize} country='us' category='general' apiKey = {apiKey} />}></Route>
            <Route path='/business' element={<News setProgress = {setProgress} key='business' pageSize={pageSize} country='us' category='business' apiKey = {apiKey}/>}></Route>
            <Route path='/entertainment' element={<News setProgress = {setProgress} key='entertainment' pageSize={pageSize} country='us' category='entertainment' apiKey = {apiKey}/>}></Route>
            <Route path='/health' element={<News setProgress = {setProgress} key='health' pageSize={pageSize} country='us' category='health' apiKey = {apiKey}/>}></Route>
            <Route path='/science' element={<News setProgress = {setProgress} key='science' pageSize={pageSize} country='us' category='science' apiKey = {apiKey}/>}></Route>
            <Route path='/sports' element={<News setProgress = {setProgress} key='sports' pageSize={pageSize} country='us' category='sports' apiKey = {apiKey}/>}></Route>
            <Route path='/technology' element={<News setProgress = {setProgress} key='technology' pageSize={pageSize} country='us' category='technology' apiKey = {apiKey}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
}

export default App;