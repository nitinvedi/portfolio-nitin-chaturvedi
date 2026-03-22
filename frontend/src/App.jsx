import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx';
import Education from './pages/Education.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ThemeProvider } from './context/ThemeContext';

import GrainOverlay from './components/common/GrainOverlay';
import CommandPalette from './components/common/CommandPalette';

function App() {

  return (
    <ThemeProvider>
      <GrainOverlay />
      <CommandPalette />
      <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/work' element={<Work />} />
              <Route path='/edu' element={<Education />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/:id' element={<ProjectDetail />} />
            </Route>
          </Routes>
        </Router>
    </ThemeProvider>
  )
}

export default App
