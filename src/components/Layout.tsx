import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import { MessageSquarePlus, Briefcase, Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Find Jobs', path: '/' },
    { name: 'Post a Gig', path: '/post-job' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#25D366] p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-foreground uppercase">
            Nairobi<span className="text-[#25D366]">Hustle</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold transition-colors hover:text-[#25D366] uppercase tracking-wide ${
                location.pathname === link.path ? 'text-[#25D366]' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-black shadow-lg shadow-emerald-100">
            <Link to="/post-job">
              <MessageSquarePlus className="w-4 h-4 mr-2" />
              Post Job
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-black py-2 uppercase tracking-wide ${
                    location.pathname === link.path ? 'text-[#25D366]' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full rounded-xl h-14 font-black">
                <Link to="/post-job" onClick={() => setIsOpen(false)}>
                  <MessageSquarePlus className="w-4 h-4 mr-2" />
                  Post a Gig
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-[#25D366] p-1.5 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight uppercase">NAIROBI HUSTLE</span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-8 font-medium leading-relaxed">
              Kenya's simplest and fastest daily jobs marketplace. Connect with verified gigs and employers via WhatsApp in seconds.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#25D366] font-bold bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4" />
              Verified Nairobi Gigs
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-lg mb-6 uppercase tracking-wider">Popular Areas</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><Link to="/jobs-westlands" className="hover:text-[#25D366] transition-colors">Westlands Gigs</Link></li>
              <li><Link to="/jobs-kasarani" className="hover:text-[#25D366] transition-colors">Kasarani Gigs</Link></li>
              <li><Link to="/jobs-karen" className="hover:text-[#25D366] transition-colors">Karen Gigs</Link></li>
              <li><Link to="/jobs-embakasi" className="hover:text-[#25D366] transition-colors">Embakasi Gigs</Link></li>
              <li><Link to="/jobs-cbd" className="hover:text-[#25D366] transition-colors">CBD Daily Gigs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-lg mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-bold">
              <li><Link to="/pricing" className="hover:text-[#25D366] transition-colors">Pricing</Link></li>
              <li><Link to="/safety-tips" className="hover:text-[#25D366] transition-colors">Safety Tips</Link></li>
              <li><Link to="/contact" className="hover:text-[#25D366] transition-colors">Contact Support</Link></li>
              <li><Link to="/terms" className="hover:text-[#25D366] transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} Nairobi Hustle Board. All rights reserved.</p>
          <p>Built for the Nairobi Hustler community.</p>
        </div>
      </div>
    </footer>
  );
}