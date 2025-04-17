import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer'

function App() {

  return (
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}

export default App
