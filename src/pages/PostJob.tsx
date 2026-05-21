import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CATEGORIES, Category } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  MessageSquarePlus, 
  MapPin, 
  Banknote, 
  Phone, 
  Clock, 
  ChevronLeft,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export default function PostJob() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '' as Category,
    location: 'Nairobi',
    area: '',
    payAmount: '',
    payRate: 'daily',
    duration: '1 day',
    contactNumber: '',
    description: '',
    requirements: '',
    company: '',
    isFeatured: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && (!formData.title || !formData.category || !formData.area)) {
      toast.error('Please fill in all basic job details');
      return;
    }
    if (step === 2 && (!formData.payAmount || !formData.contactNumber)) {
      toast.error('Payment and contact info are required');
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) {
      toast.error('Please provide a job description');
      return;
    }
    
    toast.success('Hustle submitted for approval!');
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#25D366] shadow-lg shadow-emerald-50">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Gig Submitted!</h1>
          <p className="text-slate-600 text-lg">
            Your job post is being reviewed by our team. It will go live once verified, usually within 30 minutes.
          </p>
          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-left">
            <h4 className="font-bold mb-4 text-slate-900">Next Steps:</h4>
            <ul className="text-sm text-slate-600 space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white mt-0.5 shrink-0">1</div>
                <span className="font-medium">Our moderators verify the details to ensure it's a real gig.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white mt-0.5 shrink-0">2</div>
                <span className="font-medium">You'll receive a notification when the listing goes live.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white mt-0.5 shrink-0">3</div>
                <span className="font-medium">Job seekers will message you directly on WhatsApp.</span>
              </li>
            </ul>
          </div>
          <Button className="w-full h-14 rounded-2xl bg-slate-900 text-lg font-bold shadow-xl transition-all active:scale-95" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-6">
             <div className="bg-[#25D366] p-3 rounded-2xl shadow-xl shadow-emerald-100">
              <MessageSquarePlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Post a New Gig</h1>
          <p className="text-slate-500 font-bold">Connect with Nairobi's fastest workers in seconds.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-3 mb-10">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-2.5 flex-1 rounded-full transition-all duration-500 ${
                i < step ? 'bg-[#25D366]' : 
                i === step ? 'bg-slate-900 shadow-sm' : 
                'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-bl-full -mr-10 -mt-10"></div>
           
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="text-2xl font-black mb-1">Basic Details</h3>
                  <p className="text-sm text-slate-400 font-medium">Tell us what you need help with</p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-black uppercase tracking-wider text-slate-500">Job Title</Label>\
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="e.g. House Manager, Delivery Rider, Construction Worker" 
                    value={formData.title}
                    onChange={handleInputChange}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="category" className="text-sm font-black uppercase tracking-wider text-slate-500">Category</Label>
                  <Select onValueChange={(v) => handleSelectChange('category', v)} value={formData.category}>
                    <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>\
                    <SelectContent className="rounded-2xl">
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat} className="py-3">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="area" className="text-sm font-black uppercase tracking-wider text-slate-500">Location (Area in Nairobi)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                      id="area" 
                      name="area"
                      placeholder="e.g. Westlands, Kasarani, Karen, CBD" 
                      value={formData.area}
                      onChange={handleInputChange}
                      className="h-14 pl-12 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-black uppercase tracking-wider text-slate-500">Employer Name (Optional)</Label>
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="e.g. Home Owner, ABC Ltd" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="text-2xl font-black mb-1">Payment & Contact</h3>
                  <p className="text-sm text-slate-400 font-medium">How much are you paying?</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="payAmount" className="text-sm font-black uppercase tracking-wider text-slate-500">Pay Amount (KSh)</Label>
                    <div className="relative">
                      <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input 
                        id="payAmount" 
                        name="payAmount"
                        type="number"
                        placeholder="e.g. 1500" 
                        value={formData.payAmount}
                        onChange={handleInputChange}
                        className="h-14 pl-12 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="payRate" className="text-sm font-black uppercase tracking-wider text-slate-500">Schedule</Label>
                    <Select onValueChange={(v) => handleSelectChange('payRate', v)} value={formData.payRate}>
                      <SelectTrigger className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="once">Once (Fixed)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="contactNumber" className="text-sm font-black uppercase tracking-wider text-slate-500">WhatsApp Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                      id="contactNumber" 
                      name="contactNumber"
                      placeholder="e.g. 254712345678" 
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="h-14 pl-12 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold flex items-center gap-2 px-2">
                    <HelpCircle className="w-4 h-4 text-emerald-500" />
                    Format: 2547XXXXXXXX (No '+' or spaces)
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="duration" className="text-sm font-black uppercase tracking-wider text-slate-500">Gig Duration</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input 
                      id="duration" 
                      name="duration"
                      placeholder="e.g. 1 day, Permanent, 1 week" 
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="h-14 pl-12 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366] text-lg font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="text-2xl font-black mb-1">Final Review</h3>
                  <p className="text-sm text-slate-400 font-medium">Make your gig stand out</p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-black uppercase tracking-wider text-slate-500">Full Job Description</Label>
                  <div className="bg-slate-50/50 p-1 rounded-2xl">
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Explain what the job involves, working hours, and any special instructions..." 
                      value={formData.description}
                      onChange={handleInputChange}
                      className="min-h-[180px] rounded-2xl border-slate-200 focus-visible:ring-[#25D366] p-5 text-base leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="requirements" className="text-sm font-black uppercase tracking-wider text-slate-500">Requirements (Optional)</Label>
                  <Input 
                    id="requirements" 
                    name="requirements"
                    placeholder="e.g. Experience, Own Tools, Good Conduct (comma separated)" 
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus-visible:ring-[#25D366]"
                  />
                </div>

                <div className="p-6 bg-slate-900 rounded-[2rem] border border-slate-800 text-white space-y-4 shadow-2xl">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-400" />
                        <span className="font-black uppercase tracking-wider">Premium Options</span>
                     </div>
                     <Badge className="bg-orange-500 text-white border-none">PRO</Badge>
                   </div>

                   <label className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-6 h-6 rounded-lg bg-transparent border-2 border-white/20 checked:bg-[#25D366] text-[#25D366]"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-white">Get Featured (KSh 500)</p>\
                        <p className="text-xs text-slate-400">Appear at the top for 7 days. Hire 3x faster.</p>
                      </div>
                   </label>
                </div>

                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    By posting, you agree to Nairobi Hustle's terms. We verify all listings to keep our community safe. Standard posting fee is <span className="font-black">KSh 50</span>.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-14 rounded-2xl font-bold border-2"
                  onClick={prevStep}
                >\
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button 
                  type="button" 
                  className="flex-[2] h-14 rounded-2xl bg-slate-900 text-white font-black text-lg shadow-xl active:scale-95 transition-all"
                  onClick={nextStep}
                >
                  Continue
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex-[2] h-14 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-lg shadow-xl shadow-emerald-200 active:scale-95 transition-all"
                >
                  {formData.isFeatured ? <><CreditCard className="w-5 h-5 mr-2" /> Pay KSh 550</> : 'Post Job for KSh 50'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}