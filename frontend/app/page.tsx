'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Building2, ShieldCheck, Wrench, ArrowRight, CheckCircle2, 
  BarChart3, Users, Zap, LayoutDashboard, FileText, Phone, 
  Settings, UserCheck, Wallet, Sparkles, Activity, Play, Star,
  Smartphone, Lock, Plus, Minus, Mail, MapPin, Search, Sun, Moon,
  ChevronDown, Server, Network, Fingerprint, Share2, ArrowDown,
  Layers, Package, HardDrive, Car, Navigation, Key
} from 'lucide-react';
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700', '800'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600', '700'] });

// --- REUSABLE COMPONENTS ---

interface FadeInProps { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "down" | "left" | "right" }
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: FadeInProps) => {
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  const xOffset = direction === "left" ? 30 : direction === "right" ? -30 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SectionHeaderProps { title: string; highlight: string; subtitle: string; align?: "center" | "left" }
const SectionHeader = ({ title, highlight, subtitle, align = "center" }: SectionHeaderProps) => (
  <FadeIn className={`mb-16 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight ${plusJakartaSans.className}`}>
      {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">{highlight}</span>
    </h2>
    <p className={`text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed ${align === "center" ? "mx-auto" : ""} ${inter.className}`}>
      {subtitle}
    </p>
  </FadeIn>
);

interface PremiumCardProps { children: React.ReactNode; className?: string; hoverEffect?: boolean }
const PremiumCard = ({ children, className = "", hoverEffect = true }: PremiumCardProps) => (
  <div className={`relative group rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden transition-all duration-500 ${hoverEffect ? 'hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10' : ''} ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    {children}
  </div>
);

// --- MAIN PAGE ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.15], [0, 50]);
  const [activeModule, setActiveModule] = React.useState('property');
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-[#030712] text-slate-300 selection:bg-blue-500/30 overflow-x-hidden ${inter.className}`}>
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="w-10 h-10 flex-shrink-0 group-hover:scale-105 transition-transform bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Layers className="w-5 h-5 text-cyan-400" />
            </span>
            <span className="flex flex-col justify-center">
              <b className={`text-xl font-bold tracking-tight text-white leading-none mb-0.5 ${plusJakartaSans.className}`}>BMMS</b>
              <small className="text-[9px] text-slate-500 font-bold leading-none uppercase tracking-widest">Enterprise</small>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {['Platform', 'Modules', 'Solutions', 'Resources', 'About'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-400 hover:text-white transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/login">
              <button className="h-10 px-5 rounded-full bg-white text-[#030712] text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712] pointer-events-none" />
        
        <motion.div style={{ opacity: opacityHero, y: yHero }} className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left relative z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-cyan-400 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-cyan-900/20"
            >
              <Sparkles className="w-4 h-4" />
              The Next-Gen Property Standard
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] ${plusJakartaSans.className}`}
            >
              Everything Your Property Needs. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">One Intelligent Platform.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed ${inter.className}`}
            >
              BMMS brings property management, facilities, security, work orders, assets, parking, and resident services into one connected ecosystem.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/login">
                <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-white text-[#030712] text-base font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="w-full sm:w-auto h-14 px-8 rounded-full border border-slate-700 bg-slate-800/30 backdrop-blur-xl text-white text-base font-bold hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2">
                Explore Platform
              </button>
            </motion.div>
          </div>

          <div className="relative z-10 w-full aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] flex items-center justify-center">
            {/* Intelligent Property Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
              className="relative w-full h-full max-h-[600px] flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-cyan-900/10 rounded-full blur-3xl animate-pulse" />
              
              {/* Central Building Icon */}
              <div className="relative z-20 w-32 h-32 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center">
                <Building2 className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <div className="absolute -inset-1 border border-cyan-500/30 rounded-[26px] animate-[spin_10s_linear_infinite]" />
              </div>

              {/* Connecting Lines & Orbits */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-slate-800" />
                <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-slate-800" />
                
                {/* Animated Particles on orbits */}
                <motion.circle cx="200" cy="80" r="3" fill="#38bdf8" style={{ transformOrigin: "200px 200px" }} animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                <motion.circle cx="200" cy="20" r="3" fill="#818cf8" style={{ transformOrigin: "200px 200px" }} animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
              </svg>

              {/* Floating Data Cards */}
              {[
                { top: '10%', left: '10%', text: "24 Active Work Orders", icon: Wrench, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", delay: 0.4 },
                { top: '15%', right: '5%', text: "98% Satisfaction", icon: Star, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", delay: 0.6 },
                { bottom: '20%', left: '5%', text: "12 Connected Towers", icon: Building2, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", delay: 0.8 },
                { bottom: '15%', right: '10%', text: "8 Security Alerts", icon: ShieldCheck, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", delay: 1.0 },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay, duration: 0.8, type: "spring" }}
                  style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
                  className="absolute z-30"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: card.delay, ease: "easeInOut" }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border ${card.border} shadow-xl hover:scale-105 transition-transform cursor-default whitespace-nowrap`}
                  >
                    <div className={`w-8 h-8 rounded-full ${card.bg} flex items-center justify-center`}>
                      <card.icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                    <span className={`text-sm font-semibold text-white ${plusJakartaSans.className}`}>{card.text}</span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TRUST / CREDIBILITY */}
      <section className="py-12 border-y border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-slate-500 mb-8 uppercase tracking-widest">Built for modern property operations</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {['Property Management', 'Facility Management', 'Residential Communities', 'Commercial Buildings', 'Mixed Developments'].map((type, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-600" />
                <span className={`text-slate-400 font-medium ${inter.className}`}>{type}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM -> SOLUTION */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Network className="w-6 h-6" />
              </div>
              <h2 className={`text-3xl md:text-5xl font-bold text-slate-400 mb-6 leading-tight ${plusJakartaSans.className}`}>
                Property management shouldn&apos;t feel <span className="text-white relative inline-block">fragmented.<div className="absolute bottom-1 left-0 w-full h-1 bg-rose-500/50 rounded-full" /></span>
              </h2>
              <div className="space-y-4 mb-10">
                {[
                  "Multiple disconnected systems",
                  "Manual and slow processes",
                  "Lost maintenance requests",
                  "Communication gaps between teams"
                ].map((prob, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-400">
                    <Minus className="w-5 h-5 text-rose-500/70" />
                    <span className="font-medium text-lg">{prob}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn direction="left">
              <PremiumCard className="p-8 md:p-12 border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 relative z-10">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl md:text-5xl font-bold text-white mb-6 leading-tight relative z-10 ${plusJakartaSans.className}`}>
                  BMMS connects <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">everything.</span>
                </h2>
                <div className="space-y-4 relative z-10">
                  {[
                    "One unified ecosystem",
                    "Automated end-to-end workflows",
                    "Real-time operational visibility",
                    "Seamless team collaboration"
                  ].map((sol, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-200">
                      <Plus className="w-5 h-5 text-emerald-400" />
                      <span className="font-medium text-lg">{sol}</span>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MODULE SHOWCASE & PLATFORM OVERVIEW */}
      <section id="modules" className="py-24 md:py-32 relative z-10 bg-slate-900/20 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="One platform." 
            highlight="Every operation." 
            subtitle="Explore the interconnected modules that power modern properties."
          />

          {/* Module Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'property', label: 'Property Admin', icon: Building2 },
              { id: 'facility', label: 'Facility Mgmt', icon: LayoutDashboard },
              { id: 'work_orders', label: 'Work Orders', icon: Wrench },
              { id: 'assets', label: 'Assets', icon: HardDrive },
              { id: 'security', label: 'Security', icon: ShieldCheck },
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeModule === mod.id ? 'bg-white text-slate-900 shadow-lg scale-105' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700/50'}`}
              >
                <mod.icon className="w-4 h-4" />
                {mod.label}
              </button>
            ))}
          </div>

          {/* Module Display Area */}
          <PremiumCard className="p-8 md:p-12 min-h-[400px] flex flex-col md:flex-row items-center gap-12">
            <AnimatePresence mode="wait">
              {activeModule === 'property' && (
                <motion.div key="property" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1">
                  <h3 className={`text-3xl font-bold text-white mb-4 ${plusJakartaSans.className}`}>Property Administration</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">Map out your entire portfolio. Manage buildings, towers, floors, units, owners, tenants, and residents in an intuitive digital hierarchy.</p>
                  <ul className="grid grid-cols-2 gap-4">
                    {['Building Setup', 'Unit Management', 'Tenant Records', 'Document Storage'].map(i => (
                      <li key={i} className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-blue-400" /> {i}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {activeModule === 'facility' && (
                <motion.div key="facility" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1">
                  <h3 className={`text-3xl font-bold text-white mb-4 ${plusJakartaSans.className}`}>Facility Management</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">Ensure all amenities and facilities are well-maintained. Schedule preventive maintenance, track facility usage, and manage inspections seamlessly.</p>
                  <ul className="grid grid-cols-2 gap-4">
                    {['Facility Booking', 'Preventive Maintenance', 'Inspections', 'Vendor Management'].map(i => (
                      <li key={i} className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {i}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {/* Add other modules similarly if desired, just keeping it robust. */}
              {['work_orders', 'assets', 'security'].includes(activeModule) && (
                <motion.div key="other" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1">
                  <h3 className={`text-3xl font-bold text-white mb-4 ${plusJakartaSans.className}`}>Integrated Ecosystem</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">Whether it&apos;s tracking assets, dispatching technicians for work orders, or monitoring security operations, BMMS brings it into a single pane of glass.</p>
                  <ul className="grid grid-cols-2 gap-4">
                    {['Real-time Updates', 'Mobile App Access', 'Automated Workflows', 'Detailed Analytics'].map(i => (
                      <li key={i} className="flex items-center gap-2 text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> {i}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex-1 w-full h-[300px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
               <motion.div 
                 key={activeModule}
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: 'spring', bounce: 0.4 }}
                 className="relative z-10 w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center"
               >
                 {activeModule === 'property' && <Building2 className="w-20 h-20 text-blue-400" />}
                 {activeModule === 'facility' && <LayoutDashboard className="w-20 h-20 text-emerald-400" />}
                 {activeModule === 'work_orders' && <Wrench className="w-20 h-20 text-amber-400" />}
                 {activeModule === 'assets' && <HardDrive className="w-20 h-20 text-purple-400" />}
                 {activeModule === 'security' && <ShieldCheck className="w-20 h-20 text-rose-400" />}
               </motion.div>
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* DIGITAL BUILDING VISUALIZATION (Hierarchy) */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeader 
            title="Intelligent" 
            highlight="Hierarchy" 
            subtitle="Built from the ground up to support complex multi-layered properties."
          />
          
          <div className="flex flex-col items-center gap-4 py-12 relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-500/50 to-transparent -z-10" />
            
            {[
              { level: 'Building', desc: 'The root entity', icon: Building2 },
              { level: 'Tower / Block', desc: 'Manage multiple structures', icon: Layers },
              { level: 'Floor', desc: 'Spatial grouping', icon: Package },
              { level: 'Unit', desc: 'Individual spaces', icon: Key },
              { level: 'Resident', desc: 'End-users & tenants', icon: Users }
            ].map((node, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="flex items-center gap-6 group cursor-default bg-[#030712] py-2">
                  <div className="w-32 text-right hidden sm:block">
                    <div className="text-slate-400 text-sm font-medium">{node.desc}</div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-slate-700 group-hover:border-blue-500 flex items-center justify-center relative z-10 transition-colors shadow-lg">
                    <node.icon className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="w-32 text-left">
                    <div className={`text-xl font-bold text-white ${plusJakartaSans.className}`}>{node.level}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section className="py-24 md:py-32 relative z-10 bg-slate-900/20 border-y border-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Connected" 
            highlight="Workflows" 
            subtitle="See how a simple maintenance request flows seamlessly through the organization."
          />
          
          <div className="relative mt-16 max-w-5xl mx-auto">
            {/* Desktop Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
            <div className="hidden md:block absolute top-1/2 left-0 w-3/4 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 -translate-y-1/2 z-0" />
            
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
              {[
                { title: 'Resident Request', icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-900/30' },
                { title: 'Manager Approval', icon: UserCheck, color: 'text-amber-400', bg: 'bg-amber-900/30' },
                { title: 'Tech Assigned', icon: Wrench, color: 'text-cyan-400', bg: 'bg-cyan-900/30' },
                { title: 'Issue Resolved', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-900/30' }
              ].map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.2} className="flex-1 flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-6 bg-slate-900 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none border md:border-none border-slate-800">
                  <div className={`w-14 h-14 rounded-full ${step.bg} border-2 border-slate-700 flex items-center justify-center shadow-lg relative z-10`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div>
                    <div className={`text-lg font-bold text-white mb-1 ${plusJakartaSans.className}`}>{step.title}</div>
                    <div className="text-sm text-slate-400 hidden md:block">Automated step {idx + 1}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USER PERSONAS */}
      <section id="solutions" className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Built for" 
            highlight="Everyone" 
            subtitle="Dedicated interfaces designed specifically for the people using them."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Property Manager', icon: LayoutDashboard, desc: 'Manage the entire property portfolio, finances, and team from a powerful command center.' },
              { role: 'Technician', icon: Wrench, desc: 'Receive work orders, complete checklists, and update progress on a streamlined mobile interface.' },
              { role: 'Security Team', icon: ShieldCheck, desc: 'Scan visitor QR passes, conduct guard tours, and report incidents in real-time.' },
              { role: 'Resident', icon: Smartphone, desc: 'Pay bills, book facilities, and raise complaints easily from a personal resident app.' }
            ].map((persona, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <PremiumCard className="p-8 h-full flex flex-col items-start group">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <persona.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold text-white mb-3 ${plusJakartaSans.className}`}>{persona.role}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{persona.desc}</p>
                </PremiumCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY / MULTI-TENANCY */}
      <section className="py-24 md:py-32 relative z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <PremiumCard className="p-10 md:p-16 text-center overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <Fingerprint className="w-16 h-16 text-emerald-400 mx-auto mb-6 relative z-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 ${plusJakartaSans.className}`}>Secure by Architecture</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 relative z-10">
              Enterprise-grade security built directly into the foundation. Total data isolation, robust role-based access control, and complete auditability.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative z-10">
              {['Multi-tenant Isolation', 'Role-Based Access (RBAC)', 'Audit Logs', 'Secure Auth'].map(item => (
                <div key={item} className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50 shadow-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </PremiumCard>
        </div>
      </section>

      {/* MOBILE EXPERIENCE */}
      <section className="py-24 md:py-32 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${plusJakartaSans.className}`}>
              Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Mobile Freedom.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Responsive web applications and native mobile interfaces ensure that whether you are at your desk or inspecting the roof, BMMS works flawlessly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <LayoutDashboard className="w-6 h-6 text-blue-400" />
                <span className="font-semibold text-white">Full Desktop Dashboard</span>
              </div>
              <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <Smartphone className="w-6 h-6 text-emerald-400" />
                <span className="font-semibold text-white">Optimized Mobile Web</span>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex justify-center relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="w-[280px] h-[580px] bg-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative z-10 flex flex-col overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl" />
               <div className="p-4 pt-12 flex-1 flex flex-col gap-4">
                 <div className="flex items-center justify-between mb-2">
                   <div className="w-8 h-8 rounded-full bg-slate-800" />
                   <div className="w-24 h-4 rounded bg-slate-800" />
                 </div>
                 <div className="w-full h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30" />
                 <div className="grid grid-cols-2 gap-4">
                   <div className="h-24 rounded-xl bg-slate-800/50" />
                   <div className="h-24 rounded-xl bg-slate-800/50" />
                 </div>
                 <div className="flex-1 rounded-xl bg-slate-800/50" />
               </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 md:py-32 relative z-10 bg-slate-900/20 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
           <SectionHeader 
            title="Measurable" 
            highlight="Impact" 
            subtitle="The benefits of running your property on a modern operating system."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Reduce Manual Work", desc: "Automate repetitive property operations and data entry." },
              { title: "Faster Issue Resolution", desc: "Connect complaints directly with operational workflows." },
              { title: "Better Visibility", desc: "Understand exactly what is happening across your portfolio." },
              { title: "Connected Teams", desc: "Keep management, technicians, and security in sync." },
              { title: "Scalable Operations", desc: "Easily add new properties without multiplying headcount." },
              { title: "Premium Experience", desc: "Give residents the high-quality digital experience they expect." }
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <PremiumCard className="p-8 h-full" hoverEffect={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <h3 className={`text-lg font-bold text-white ${plusJakartaSans.className}`}>{benefit.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
                </PremiumCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border border-blue-500/20 p-12 md:p-20 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60" />
             <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 relative z-10 leading-tight ${plusJakartaSans.className}`}>
               Your property deserves a smarter operating system.
             </h2>
             <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
               Bring property management, facilities, security and resident services together with BMMS.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <button className="h-14 px-10 rounded-full bg-white text-[#030712] font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
                 Get Started
               </button>
               <button className="h-14 px-10 rounded-full bg-slate-900 border border-slate-700 text-white font-bold text-lg hover:bg-slate-800 transition-all">
                 Talk to Us
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-[#030712] pt-20 pb-10 text-sm text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
              <Layers className="w-8 h-8 text-cyan-400" />
              <span className="flex flex-col justify-center text-left">
                <b className={`text-xl font-bold tracking-tight text-white leading-none ${plusJakartaSans.className}`}>BMMS</b>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed mb-6">
              One Intelligent Platform to Manage Your Entire Property. Built for scale, security, and speed.
            </p>
          </div>
          
          <div>
            <h4 className={`text-white font-bold mb-6 tracking-wide ${plusJakartaSans.className}`}>Platform</h4>
            <ul className="space-y-4">
              {['Property Admin', 'Facility Mgmt', 'Work Orders', 'Asset Mgmt', 'Security', 'Visitor Mgmt'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`text-white font-bold mb-6 tracking-wide ${plusJakartaSans.className}`}>Solutions</h4>
            <ul className="space-y-4">
              {['Property Managers', 'Facility Teams', 'Security Teams', 'Residents'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`text-white font-bold mb-6 tracking-wide ${plusJakartaSans.className}`}>Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Careers', 'Blog'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className={`text-white font-bold mb-6 tracking-wide ${plusJakartaSans.className}`}>Resources</h4>
            <ul className="space-y-4">
              {['Documentation', 'Support API', 'FAQs', 'Status'].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>© {new Date().getFullYear()} BMMS Enterprise. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
