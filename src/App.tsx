import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnderConstruction from './components/UnderConstruction';
import Home from './pages/Home';
import Gear from './pages/Gear';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Privacy from './pages/Privacy';
import useEnvVariables from './hooks/useEnvVariables';

export default function App() {
  const { UNDER_CONSTRUCTION } = useEnvVariables();
  
  if (UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
