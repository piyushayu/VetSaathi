import React, { useState } from 'react';
import {
  Info,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Mail,
  MessageSquare,
  Send,
  X,
} from 'lucide-react';
import Button from '../Button';
import { Link } from 'react-router-dom';

function About({openform , open}) {
  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5 text-violet-400" />,
      handle: 'contact@freevet.org',
      href: 'mailto:contact@freevet.org',
      bgColor: 'hover:bg-violet-500/10 hover:border-violet-500/30',
    },
    {
      name: 'LinkedIn',
     // icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      handle : "linkedin.freevet",
      href: 'https://linkedin.com',
      bgColor: 'hover:bg-blue-500/10',
    },
    {
      name: 'Reddit',
      icon: <MessageSquare className="w-5 h-5 text-orange-400" />,
      handle: 'r/freevet',
      href: 'https://reddit.com',
      bgColor: 'hover:bg-orange-500/10',
    },
    {
      name: 'Twitter',
     // icon: <Twitter className="w-5 h-5 text-sky-400" />,
      handle: '@freevet_app',
      href: 'https://twitter.com',
      bgColor: 'hover:bg-sky-500/10 ',
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 text-neutral-300">
      
      <div className="flex flex-col items-center text-center gap-2 mb-2 relative">
        <div className="absolute -top-10 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-2">
          About <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 to-indigo-500">Freevet</span>
        </h1>
        <p className="text-neutral-400 max-w-xl text-sm md:text-base leading-relaxed">
          Empowering pet parents and animal guardians with accessible, evidence-based veterinary insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          <div className="p-0.5 rounded-3xl bg-linear-to-b from-white/10 to-transparent">
            <div className="bg-neutral-950/40 backdrop-blur-md rounded-[22px] border border-white/5 p-6 md:p-8 flex flex-col gap-6">
             
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 flex flex-col gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 hover:border-violet-500/20 hover:shadow-lg hover:shadow-violet-950/5 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                      <Info className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Our Mission</h2>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Freevet is a dedicated, open-access platform built to support pet owners and animal lovers. We believe that initial guidance on pet health should be freely accessible to everyone. By compiling intuitive diagnostic questionnaires, educational resources, and emergency information, we help you understand your pet's needs before consulting a professional.
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    Whether you care for a household puppy, a stray dog in your neighborhood, or farm animals, our goal is to bridge the gap in animal healthcare accessibility.
                  </p>
                </div>

                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-950/5 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Disclaimer</h2>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    All tools, diagnostics, and articles provided on Freevet are for educational purposes only.
                  </p>
                  <div className="p-3 bg-red-950/15 rounded-xl border border-red-900/30 text-xs text-red-300 leading-relaxed font-medium">
                    This platform is NOT a veterinary clinic. We do not provide prescription medicine or medical treatments. Always consult a licensed veterinarian in emergencies.
                  </div>
                </div>

              
                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-950/5 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-wide">Features</h2>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-xs text-neutral-400">
                    <li className="flex gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Symptom Checker:</strong> Walk through interactive guides to analyze clinical patterns.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Disease Library:</strong> Comprehensive guides covering viral, bacterial, and skin conditions.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span><strong>Support Info:</strong> Critical suggestions, vaccination guidelines, and care recommendations.</span>
                    </li>
                  </ul>
                </div>


                <div className="md:col-span-2 flex flex-col gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/60 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-950/5 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white tracking-wide">References & Guidelines</h2>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Our database and diagnostics are designed in alignment with standard, globally recognized veterinary practices. We draw our findings and details from trusted authorities:
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs text-neutral-400 font-medium">
                    <div className="flex items-center gap-2 p-2 bg-neutral-950/40 rounded-lg border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Merck Vet Manual</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-950/40 rounded-lg border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>AVMA Journal Guidelines</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-950/40 rounded-lg border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>WHO Zoonoses Section</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-neutral-950/40 rounded-lg border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Open Vet Med Journals</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-linear-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 hover:border-violet-500/30 transition-all duration-300">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <h3 className="font-bold text-white text-sm">Have ideas to improve Freevet?</h3>
                  <p className="text-xs text-neutral-400">We constantly improve our services and database based on user suggestions.</p>
                </div>
                <Link to="/contact"><Button 
                  Clickfunctn={openform}
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-full transition-all font-semibold shadow-md active:scale-95 whitespace-nowrap cursor-pointer text-xs"
                >
                  Contact us here
                </Button></Link>
              </div>

            </div>
          </div>

        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="h-full p-6 rounded-3xl bg-neutral-900/40 border border-white/5 flex flex-col gap-5 hover:border-white/10 transition-all">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-white tracking-wide">Social media</h2>
              <p className="text-xs text-neutral-400">Connect with our community and creators.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between p-4 rounded-2xl bg-neutral-900 border border-neutral-800 transition-all duration-300 ${link.bgColor} group`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:scale-105 transition-transform">
                      {link.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {link.name}
                      </span>
                      <span className="text-xs text-neutral-200 font-mono">
                        {link.handle}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-auto p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 text-center flex flex-col gap-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Open Source</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Freevet is fully open-source. Help us make animal care resources better!
              </p>
              <a 
                href="https://github.com" 
                className="mt-1 inline-flex items-center justify-center gap-2 py-2 bg-neutral-850 hover:bg-neutral-800 text-xs text-neutral-200 font-semibold rounded-xl border border-neutral-700 transition-all"
              >
                <span>GitHub Repo</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default About;