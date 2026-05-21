import { Link } from 'react-router';
import { Job } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, MessageCircle, Clock, Banknote, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  // Pre-filled message as requested: \u201cHello, I am interested in the job: [Job Title] in [Location]\u201d
  const whatsappUrl = `https://wa.me/${job.contactNumber}?text=${encodeURIComponent(
    `Hello, I am interested in the job: ${job.title} in ${job.area}, Nairobi.`
  )}`;

  return (
    <div className={`relative flex flex-col group bg-white border-2 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${job.isFeatured ? 'border-orange-200 ring-2 ring-orange-100 shadow-orange-100/50' : 'border-slate-100'}`}>
      {job.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none font-black px-3 py-1 shadow-lg shadow-orange-200 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            FEATURED
          </Badge>
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none font-bold px-2.5 py-1">
            {job.category}
          </Badge>
          <div className="flex items-center text-slate-400 text-[11px] font-bold uppercase tracking-wider ml-auto">
            <Clock className="w-3 h-3 mr-1 text-[#25D366]" />
            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </div>
        </div>

        <Link to={`/job/${job.id}`} className="block mb-2">
          <h3 className="text-xl font-black text-slate-900 group-hover:text-[#25D366] transition-colors leading-tight line-clamp-2">
            {job.title}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 font-bold mb-6">{job.company || 'Private Household'}</p>

        <div className="space-y-3 mb-8">
          <div className="flex items-center text-slate-600">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
              <MapPin className="w-4 h-4 text-[#25D366]" />
            </div>
            <span className="text-sm font-bold">{job.area}, Nairobi</span>
          </div>
          <div className="flex items-center text-slate-600">
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
              <Banknote className="w-4 h-4 text-[#25D366]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900">KSh {job.payAmount.toLocaleString()}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">/ {job.payRate}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <Button asChild variant="outline" className="flex-1 rounded-2xl h-12 font-bold border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-sm">
            <Link to={`/job/${job.id}`}>View Details</Link>
          </Button>
          <Button 
            className="flex-[1.5] bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl h-12 font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}