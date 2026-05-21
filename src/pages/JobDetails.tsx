import { useParams, useNavigate } from 'react-router';
import { MOCK_JOBS } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Banknote, 
  Clock, 
  MessageCircle, 
  ArrowLeft, 
  Briefcase,
  CheckCircle2,
  Share2,
  ShieldAlert
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = MOCK_JOBS.find(j => j.id === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
        <p className="text-muted-foreground mb-6">The job listing you're looking for might have expired or been removed.</p>
        <Button onClick={() => navigate('/')}>Back to Job Board</Button>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${job.contactNumber}?text=${encodeURIComponent(
    `Hello, I am interested in the job: ${job.title} in ${job.area}, Nairobi. I saw it on Nairobi Hustle Board.`
  )}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this gig in ${job.area}, Nairobi: ${job.title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 hover:bg-slate-200" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hustles
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none font-bold">
                  {job.category}
                </Badge>
                {job.isFeatured && (
                  <Badge className="bg-orange-500 text-white border-none font-bold">
                    Featured
                  </Badge>
                )}
                <div className="flex items-center text-muted-foreground text-xs ml-auto">
                  <Clock className="w-3 h-3 mr-1" />
                  Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                </div>
              </div>

              <h1 className="text-3xl font-black mb-2 tracking-tight">{job.title}</h1>
              <p className="text-lg text-primary font-semibold mb-6">{job.company}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment</p>
                  <div className="flex items-center text-foreground font-bold">
                    <Banknote className="w-4 h-4 mr-1.5 text-[#25D366]" />
                    KSh {job.payAmount.toLocaleString()}
                    <span className="text-[10px] ml-1 text-muted-foreground">/{job.payRate}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location</p>
                  <div className="flex items-center text-foreground font-bold">
                    <MapPin className="w-4 h-4 mr-1.5 text-[#25D366]" />
                    {job.area}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration</p>
                  <div className="flex items-center text-foreground font-bold">
                    <Calendar className="w-4 h-4 mr-1.5 text-[#25D366]" />
                    {job.duration}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-primary" />
                    Job Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                    Requirements
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#25D366] shrink-0" />
                        <span className="text-sm font-medium">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
              <div className="bg-amber-100 p-2 rounded-full h-fit">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Safety Tips for Job Seekers</h4>
                <ul className="text-sm text-amber-800/80 space-y-1 list-disc pl-4">
                  <li>Never pay any fees before getting a job</li>
                  <li>Always meet in a public place for the first time</li>
                  <li>Tell someone where you are going</li>
                  <li>Report any suspicious listings immediately</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <h3 className="font-black text-xl mb-6">Apply Now</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Click the button below to message the employer directly on WhatsApp.
              </p>
              
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl h-14 font-black text-lg mb-4 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Apply via WhatsApp
              </Button>

              <Button 
                variant="outline" 
                className="w-full rounded-2xl h-12 font-bold border-slate-200"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share this Hustle
              </Button>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {job.company?.[0] || 'P'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Employer</p>
                    <p className="font-bold">{job.company || 'Private Employer'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
              <h4 className="font-bold mb-2">Want to post a gig?</h4>
              <p className="text-xs text-slate-400 mb-4">Post your daily job today and reach 10,000+ workers in Nairobi.</p>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold" onClick={() => navigate('/post-job')}>
                Post Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}