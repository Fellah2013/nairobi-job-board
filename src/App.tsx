import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import Admin from './pages/Admin';
import Pricing from './pages/Pricing';
import Safety from './pages/Safety';
import { Navbar, Footer } from './components/Layout';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-[#25D366]/30 selection:text-[#128C7E]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* SEO Friendly Category & Location Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs-nairobi" element={<Home />} />
            <Route path="/casual-jobs-nairobi" element={<Home />} />
            <Route path="/cleaning-jobs-nairobi" element={<Home />} />
            <Route path="/security-jobs-nairobi" element={<Home />} />
            <Route path="/construction-jobs-nairobi" element={<Home />} />
            <Route path="/events-jobs-nairobi" element={<Home />} />
            <Route path="/driving-jobs-nairobi" element={<Home />} />
            <Route path="/retail-jobs-nairobi" element={<Home />} />
            <Route path="/online-jobs-nairobi" element={<Home />} />
            
            <Route path="/jobs-westlands" element={<Home />} />
            <Route path="/jobs-kasarani" element={<Home />} />
            <Route path="/jobs-karen" element={<Home />} />
            <Route path="/jobs-embakasi" element={<Home />} />
            <Route path="/jobs-cbd" element={<Home />} />
            
            {/* Functional Routes */}
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/safety-tips" element={<Safety />} />
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors expand={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;