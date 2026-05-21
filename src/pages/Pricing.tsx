import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, Zap, Star, ShieldCheck, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    {
      name: 'Standard Post',
      price: '50',
      duration: 'Per Job',
      features: [
        'Live for 30 days',
        'Direct WhatsApp apply',
        'Verified badge',
        'Area-specific listing'
      ],
      button: 'Post a Job',
      highlight: false
    },
    {
      name: 'Featured Hustle',
      price: '500',
      duration: 'Per Week',
      features: [
        'Everything in Standard',
        'Top of homepage placement',
        'Featured orange badge',
        '3x more applications',
        'Social media shoutout'
      ],
      button: 'Get Featured',
      highlight: true
    },
    {
      name: 'Recruiter Pro',
      price: '2,500',
      duration: 'Per Month',
      features: [
        'Unlimited job posts',
        '5 featured slots/month',
        'Agency profile page',
        'Priority support',
        'Analytics dashboard'
      ],
      button: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-none font-black px-4 py-1 uppercase tracking-widest">
            Simple Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            The best value for <br />
            <span className="text-[#25D366]">Nairobi Employers</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Reach thousands of workers in Nairobi instantly. Pay only when you need to hire. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col bg-white rounded-[2.5rem] p-8 md:p-10 border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${
                plan.highlight ? 'border-[#25D366] shadow-xl shadow-emerald-50' : 'border-slate-100'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#25D366] text-white border-none font-black px-6 py-2 shadow-lg shadow-emerald-200">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-black mb-4 uppercase tracking-wider">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-slate-400">KSh</span>
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-sm font-bold text-slate-400">/ {plan.duration}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 rounded-full p-0.5 ${plan.highlight ? 'bg-[#25D366] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full h-14 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                  plan.highlight 
                    ? 'bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl shadow-emerald-100' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {plan.button}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white text-center">
           <div className="flex justify-center gap-4 mb-8">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-8 h-8 text-[#25D366]" />
              </div>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <Star className="w-8 h-8 text-blue-400" />
              </div>
           </div>
           <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Need a custom plan?</h2>
           <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
             Are you a large recruitment agency or security firm? We offer volume discounts and API access for high-frequency posters.
           </p>
           <Button variant="outline" className="h-14 px-10 border-slate-700 text-white hover:bg-white hover:text-slate-900 rounded-2xl font-black text-lg transition-all">
             Contact Recruitment Team
           </Button>
        </div>
      </div>
    </div>
  );
}