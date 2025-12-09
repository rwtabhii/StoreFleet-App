import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Navbar } from './component/navbar/navbar'
import { Footer } from './component/footer/footer'

function App() {
  return (
    <>
    <div className="app">
            {/* ✅ Toast notifications (success, error, info, etc.) */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            {/* ✅ Global Navbar (always visible across routes) */}
            <Navbar />

            {/* ✅ Renders the matched child route from react-router */}
            <Outlet />

        
              <Footer/>
    </div>
        {/* footer here */}
  
    </>
  )
}

export default App
