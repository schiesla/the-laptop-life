import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import Home from './pages/Home/Home';
import Gear from './pages/Gear/Gear';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/BlogPost/BlogPost';
import About from './pages/About/About';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Preview, { PreviewIndex } from './pages/Preview/Preview';
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
          <Route path="/terms" element={<Terms />} />
          {import.meta.env.DEV && <Route path="/preview" element={<PreviewIndex />} />}
          {import.meta.env.DEV && <Route path="/preview/:slug" element={<Preview />} />}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
