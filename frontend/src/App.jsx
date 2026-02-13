import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Projects from './pages/Projects.jsx'
import Education from './pages/Education.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ThemeProvider } from './context/ThemeContext';

import { NotificationProvider } from './context/NotificationContext';

function App() {

  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/work' element={<Work />} />
              <Route path='/edu' element={<Education />} />
              <Route path='/projects' element={<Projects />} />
            </Route>
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
