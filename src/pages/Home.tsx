import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router';
import { MOCK_JOBS } from '../data/mockData';
import { JobCard } from '../components/JobCard';
import { CATEGORIES, Category } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, MapPin, Filter, Star, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { motion } from 'framer-motion';

const PATH_MAP: Record<string, { category?: Category | 'All'; area?: string; title: string }> = {
  '/': { category: 'All', title: 'Nairobi Hustle Board - Daily Gigs & Jobs' },
  '/jobs-nairobi': { category: 'All', title: 'All Gigs in Nairobi - Nairobi Hustle Board' },
  '/casual-jobs-nairobi': { category: 'Casual Jobs', title: 'Casual Jobs in Nairobi - Daily Hustles' },
  '/cleaning-jobs-nairobi': { category: 'Cleaning & House Help', title: 'Cleaning & Domestic Jobs Nairobi' },
  '/security-jobs-nairobi': { category: 'Security Jobs', title: 'Security & Guard Jobs Nairobi' },
  '/construction-jobs-nairobi': { category: 'Construction & Fundis', title: 'Fundi & Construction Jobs Nairobi' },
  '/events-jobs-nairobi': { category: 'Events & Hospitality', title: 'Events & Catering Gigs Nairobi' },
  '/driving-jobs-nairobi': { category: 'Driving & Delivery', title: 'Delivery & Boda Boda Gigs Nairobi' },
  '/retail-jobs-nairobi': { category: 'Retail & Sales', title: 'Retail & Sales Gigs Nairobi' },
  '/online-jobs-nairobi': { category: 'Online Work', title: 'Online & Remote Gigs Nairobi' },
  '/jobs-westlands': { area: 'Westlands', title: 'Daily Gigs in Westlands, Nairobi' },
  '/jobs-kasarani': { area: 'Kasarani', title: 'Daily Gigs in Kasarani, Nairobi' },
  '/jobs-karen': { area: 'Karen', title: 'Daily Gigs in Karen, Nairobi' },
  '/jobs-embakasi': { area: 'Embakasi', title: 'Daily Gigs in Embakasi, Nairobi' },
  '/jobs-cbd': { area: 'CBD', title: 'Daily Gigs in Nairobi CBD' },
};

export default function Home() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Handle SEO-friendly routes and metadata
  useEffect(() => {
    const routeData = PATH_MAP[location.pathname];
    if (routeData) {
      if (routeData.category) setSelectedCategory(routeData.category);
      if (routeData.area) setLocationQuery(routeData.area);
      document.title = routeData.title;
    } else {
      setSelectedCategory('All');
      setLocationQuery('');
      document.title = 'Nairobi Hustle Board';
    }
  }, [location.pathname]);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = job.area.toLowerCase().includes(locationQuery.toLowerCase());
      return matchesCategory && matchesSearch && matchesLocation;
    });
  }, [selectedCategory, searchQuery, locationQuery]);

  const featuredJobs = useMemo(() => filteredJobs.filter(job => job.isFeatured), [filteredJobs]);
  const regularJobs = useMemo(() => filteredJobs.filter(job => !job.isFeatured), [filteredJobs]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7892c3ac-3e74-47d8-93b3-4561b907ec1b/nairobi-hustle-hero-38ebb6f0-1778847491058.webp" 
            alt="Nairobi Street Scene" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 py-1.5 px-4 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
              <span className="text-sm font-bold tracking-wide uppercase">Kenya's #1 Daily Jobs Board</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Find a Gig, <br className="hidden md:block" />
              <span className="text-[#25D366]">Get Paid Today.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-300 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Skip the long applications. Find daily hustles in Nairobi and connect with employers directly on <span className="text-white font-bold underline decoration-[#25D366] underline-offset-4">WhatsApp</span>.
            </p>

            <div className="bg-white p-3 rounded-2xl md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-white/20">
              <div className="flex-[1.2] relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder="Job title (e.g. Fundi, Cleaner)" 
                  className="pl-12 h-14 border-none bg-transparent text-slate-900 text-lg placeholder:text-slate-400 focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-px bg-slate-200 hidden md:block my-3"></div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  placeholder="Area (e.g. Kasarani)" 
                  className="pl-12 h-14 border-none bg-transparent text-slate-900 text-lg placeholder:text-slate-400 focus-visible:ring-0"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <Button className="h-14 px-10 bg-[#25D366] hover:bg-[#128C7E] text-white text-lg font-black rounded-xl md:rounded-2xl transition-all hover:scale-[1.02] active:scale-95">
                Search Gigs
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Verified Listings
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" /> Instant Apply
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">500+</span> Gigs Posted Today
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-6 bg-white border-b overflow-x-auto no-scrollbar sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 min-w-max pb-2">
            <Button 
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              className={`rounded-full px-6 h-11 font-bold transition-all ${selectedCategory === 'All' ? 'bg-slate-900 text-white' : 'hover:border-slate-900'}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Gigs
            </Button>
            {CATEGORIES.map((cat) => (
              <Button 
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={`rounded-full px-6 h-11 font-bold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white' : 'hover:border-slate-900'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <main className="flex-grow py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Featured Header */}
          {featuredJobs.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-3 rounded-2xl shadow-sm">
                    <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">Priority Gigs</h2>
                    <p className="text-sm text-muted-foreground font-medium">Featured listings for quick hiring</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-white border rounded-full text-sm font-bold text-orange-600 cursor-pointer hover:bg-orange-50 transition-colors shadow-sm">
                  Get Featured <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-2xl shadow-sm">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Latest Hustles</h2>
                  <p className="text-sm text-muted-foreground font-medium">New opportunities in {locationQuery || 'Nairobi'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-slate-200 text-slate-700 font-bold px-3 py-1">
                  {filteredJobs.length} Results
                </Badge>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                  Updated 2 mins ago
                </div>
              </div>
            </div>
            
            {regularJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 shadow-sm">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black mb-3">No gigs found here</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
                  We couldn't find any {selectedCategory !== 'All' ? selectedCategory : ''} jobs in "{locationQuery}". Try searching another area or category.
                </p>
                <Button 
                  variant="outline" 
                  className="h-12 px-8 rounded-xl font-bold border-2 hover:bg-slate-50 transition-all"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setLocationQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Post Gig CTA */}
      <section className="py-20 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-40 pointer-events-none hidden lg:block">
               <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7892c3ac-3e74-47d8-93b3-4561b907ec1b/post-job-banner-8cc3ad47-1778847491032.webp" 
                alt="Post Job" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-2xl relative z-10">
              <Badge className="mb-6 bg-[#25D366] text-white border-none py-1.5 px-4 rounded-full font-bold uppercase tracking-wider">
                For Employers
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                Need a worker <span className="text-[#25D366]">Urgent?</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                Post your gig in under 2 minutes and start receiving WhatsApp messages from qualified workers in your area immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-black px-10 h-16 text-lg shadow-xl shadow-emerald-900/20 transition-all hover:scale-[1.05]" asChild>
                  <a href="/post-job">Post a Gig Now</a>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 rounded-2xl font-black px-10 h-16 text-lg transition-all" asChild>
                  <a href="/safety-tips">Safety Tips</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}