import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import User from './pages/User'
import Alert from './components/layouts/Alerts'
import { GithubProvider } from './context/github/GithubContext'
import { AlertProvider } from './context/alert/AlertContext'




function App() {
  return (
    <div>

      <GithubProvider>
        <AlertProvider>
          <Router>
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main className='container mx-auto  px-3 pb-12'>
                <Alert/>
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/about' element={<About />}></Route>
                  <Route path='/user/:login' element={<User />}></Route>
                  <Route path='/notfound' element={<NotFound />}></Route>
                  <Route path='/*' element={<NotFound />}></Route>
                </Routes>
              </main>
              <Footer />
            </div>

          </Router>
        </AlertProvider>
      </GithubProvider>

    </div>
  )
}

export default App