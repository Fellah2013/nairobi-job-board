import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  ShieldCheck, 
  ShieldAlert, 
  MapPin, 
  Phone, 
  Users, 
  EyeOff, 
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Safety() {
  const tips = [
    {
      title: 'Never Pay upfront',
      desc: 'Nairobi Hustle Board is free for job seekers. Never pay any recruitment fee, registration fee, or uniform fee to an employer before you start working.',
      icon: <Lock className="w-6 h-6 text-red-500" />,
      color: 'bg-red-50'
    },
    {
      title: 'Meet in Public',
      desc: 'For the first interview or job briefing, always meet in a well-lit public place like a mall, coffee shop, or busy street. Avoid private homes until you trust the employer.',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Inform Someone',
      desc: 'Always tell a friend or family member where you are going, who you are meeting, and when you expect to be back. Share your live location on WhatsApp.',
      icon: <MapPin className="w-6 h-6 text-emerald-500" />,
      color: 'bg-emerald-50'
    },
    {
      title: 'Trust Your Gut',
      desc: 'If a gig sounds too good to be true (e.g., extremely high pay for very little work), it probably is. If you feel uncomfortable, walk away.',
      icon: <ShieldAlert className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-red-100 text-red-700 border-none font-black px-4 py-1 uppercase tracking-widest">
            Safety First
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            How to Stay Safe <br />
            <span className="text-[#25D366]">While Hustling</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium">
            Your safety is our top priority. Please read these guidelines before applying to any gig.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {tips.map((tip, idx) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border border-slate-100 shadow-sm ${tip.color}`}
            >
              <div className="bg-white p-3 rounded-2xl w-fit shadow-sm mb-6">
                {tip.icon}
              </div>
              <h3 className="text-xl font-black mb-4">{tip.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {tip.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <h2 className="text-3xl font-black tracking-tight">Reporting Scams</h2>
            </div>
            <p className="text-slate-300 text-lg mb-8 font-medium leading-relaxed">
              If you encounter a suspicious job listing, an employer asking for money, or someone being disrespectful, please report them immediately.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Phone className="w-5 h-5 text-[#25D366]" />
                <span className="font-bold">WhatsApp: +254 700 000 000</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span className="font-bold">Email: safety@nairobihustle.com</span>
              </div>
            </div>
            <Button className="w-full sm:w-auto h-14 px-10 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl font-black text-lg transition-all">
              Report a Listing Now
            </Button>
          </div>
        </div>

        <div className="mt-20 border-t pt-20">
          <h2 className="text-3xl font-black mb-12 text-center">Employer Verification</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
               <div className="mx-auto bg-emerald-100 p-4 rounded-full w-fit">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
               </div>
               <h4 className="font-black uppercase tracking-wide">ID Verification</h4>
               <p className="text-sm text-slate-500 font-bold">We verify the ID and phone numbers of all regular employers.</p>
            </div>
            <div className="text-center space-y-4">
               <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit">
                  <EyeOff className="w-8 h-8 text-blue-600" />
               </div>
               <h4 className="font-black uppercase tracking-wide">Fraud Detection</h4>
               <p className="text-sm text-slate-500 font-bold">Our AI system flags jobs with suspicious keywords or unrealistic pay.</p>
            </div>
            <div className="text-center space-y-4">
               <div className="mx-auto bg-purple-100 p-4 rounded-full w-fit">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
               </div>
               <h4 className="font-black uppercase tracking-wide">Community Flagging</h4>
               <p className="text-sm text-slate-500 font-bold">Listings with multiple reports are automatically hidden until review.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}