import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer'

function App() {

  return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}

export default App
