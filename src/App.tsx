import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, 
  BookOpen, Users, Award, Microscope, Shield, 
  Bus, Library, Monitor, Trophy, CheckCircle2,
  ArrowRight, Facebook, Instagram, MessageCircle,
  Home, GraduationCap, Info, Contact as ContactIcon,
  Sparkles, Star, Play, Clock, Calendar,
  TrendingUp, Target, Heart, Zap
} from 'lucide-react';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const redirectToWhatsApp = (formData: { name: string; class: string; phone: string; message?: string }) => {
  const phoneNumber = "919314424404";
  const message = `Hello Science Junction,\n\nI am interested in getting more information.\n\nName: ${formData.name}\nClass: ${formData.class}\nPhone: ${formData.phone}${formData.message ? `\nMessage: ${formData.message}` : ''}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================

const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ==========================================
// SECTION HEADER COMPONENT
// ==========================================

const SectionHeader = ({ 
  badge, 
  title, 
  subtitle, 
  light = false,
  center = true 
}: { 
  badge: string; 
  title: string; 
  subtitle?: string; 
  light?: boolean;
  center?: boolean;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`${center ? 'text-center' : ''} mb-12 md:mb-16`}
  >
    <span className={`inline-flex items-center gap-2 font-semibold uppercase tracking-widest text-xs md:text-sm mb-4 ${
      light ? 'text-purple-300' : 'text-purple-600'
    }`}>
      <span className={`w-8 h-[2px] ${light ? 'bg-purple-400' : 'bg-purple-600'}`}></span>
      {badge}
      <span className={`w-8 h-[2px] ${light ? 'bg-purple-400' : 'bg-purple-600'}`}></span>
    </span>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight ${
      light ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${
        light ? 'text-purple-200' : 'text-gray-600'
      }`}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

// ==========================================
// FIXED BUTTON COMPONENTS
// ==========================================

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline' | 'outline-white';

const Button = ({ 
  children, 
  onClick, 
  icon: Icon, 
  variant = 'primary',
  className = "",
  type = "button"
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  icon?: any; 
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-300";
  
  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-600/30",
    secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    white: "bg-white text-purple-700 hover:bg-gray-100 shadow-xl shadow-black/10 hover:shadow-2xl",
    outline: "border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300",
    'outline-white': "border-2 border-white/30 text-white hover:bg-white hover:text-purple-700",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon size={18} />}
    </motion.button>
  );
};

// ==========================================
// NAVBAR COMPONENT
// ==========================================

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: ContactIcon },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-900/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img 
                src="/images/logo.png" 
                alt="Science Junction Logo" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-lg shadow-purple-600/30"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`font-bold text-base md:text-lg leading-tight transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Science Junction
              </span>
              <span className={`text-[10px] md:text-xs font-medium tracking-wider transition-colors ${
                isScrolled ? 'text-purple-600' : 'text-purple-300'
              }`}>
                Excellence in Education
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm p-1.5 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : isScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" icon={ArrowRight} onClick={() => redirectToWhatsApp({ name: 'Enquiry', class: 'General', phone: '' })}>
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </motion.button>
              ))}
              <div className="pt-2">
                <Button variant="primary" className="w-full" icon={ArrowRight} onClick={() => redirectToWhatsApp({ name: 'Enquiry', class: 'General', phone: '' })}>
                  Enroll Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// ==========================================
// STAT CARD COMPONENT
// ==========================================

const StatCard = ({ icon: Icon, value, suffix, label, delay }: { icon: any; value: number; suffix?: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
    <div className="bg-white rounded-2xl p-6 shadow-xl shadow-purple-900/10 border border-purple-100/50 hover:border-purple-300 transition-all hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            <AnimatedCounter end={value} suffix={suffix} />
          </div>
          <div className="text-sm text-gray-500 font-medium">{label}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// FEATURE CARD COMPONENT
// ==========================================

const FeatureCard = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-gray-900/5 border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/10 transition-all"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

// ==========================================
// COURSE CARD COMPONENT
// ==========================================

const CourseCard = ({ title, description, subjects, icon: Icon, gradient, index }: { 
  title: string; 
  description: string; 
  subjects: string[]; 
  icon: any; 
  gradient: string;
  index: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group bg-white rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-900/10 transition-all"
  >
    <div className={`p-6 ${gradient} relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="relative flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white">
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
    
    <div className="p-6">
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="space-y-3">
        <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">Core Subjects</p>
        <div className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <span key={sub} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
              {sub}
            </span>
          ))}
        </div>
      </div>
      
      <motion.button 
        whileHover={{ x: 5 }}
        className="mt-6 flex items-center gap-2 text-purple-600 font-semibold group/btn"
      >
        Learn More 
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  </motion.div>
);

// ==========================================
// TOPPER CARD COMPONENT
// ==========================================

const TopperCard = ({ name, percentage, year, image, index }: { name: string; percentage: string; year: string; image: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-900/10 border border-gray-100"
  >
    <div className="relative h-56 md:h-64 overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      <div className="absolute top-4 right-4">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm shadow-lg flex items-center gap-1">
          <Trophy size={14} />
          {percentage}%
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
        <p className="text-white/80 text-sm">{year} Board Topper</p>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// FACILITY COMPONENTS
// ==========================================

interface Facility {
  icon: any;
  name: string;
  description: string;
  features: string[];
  image: string;
  color: string;
}

const facilities: Facility[] = [
  { 
    icon: Monitor, 
    name: 'Smart Classrooms', 
    description: 'Interactive digital boards with modern teaching aids',
    features: ['Interactive Whiteboards', 'Air Conditioning', 'Projector Facilities', 'Comfortable Seating'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    icon: Microscope, 
    name: 'Science Labs', 
    description: 'Fully equipped physics, chemistry & biology labs',
    features: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Safety Equipment'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
    color: 'from-emerald-500 to-emerald-600'
  },
  { 
    icon: Library, 
    name: 'Digital Library', 
    description: 'Vast collection of books and digital resources',
    features: ['5000+ Books', 'Digital Resources', 'Reading Room', 'E-Library Access'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80',
    color: 'from-amber-500 to-amber-600'
  },
  { 
    icon: Trophy, 
    name: 'Sports Complex', 
    description: 'Indoor and outdoor sports facilities',
    features: ['Cricket Ground', 'Basketball Court', 'Indoor Games', 'Fitness Center'],
    image: 'https://images.unsplash.com/photo-1461896836934-56a4ae3ad76d?w=600&q=80',
    color: 'from-rose-500 to-rose-600'
  },
];

const FacilityCard = ({ facility, index, onClick }: { facility: Facility; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-gray-900/5 border border-gray-100 hover:shadow-2xl hover:shadow-purple-900/10 transition-all"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={facility.image} 
        alt={facility.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${facility.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <facility.icon size={32} />
        </div>
      </div>
    </div>
    
    <div className="p-6">
      <h4 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h4>
      <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
      <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
        <span>Explore</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const FacilityModal = ({ facility, onClose }: { facility: Facility; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-48">
        <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${facility.color} opacity-70`}></div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <facility.icon className="text-purple-600" size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white">{facility.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6">{facility.description}</p>
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="text-yellow-500" size={16} />
          Key Features
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {facility.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-gray-700"
            >
              <CheckCircle2 size={16} className="text-purple-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>
        <Button variant="primary" className="w-full mt-6" icon={MessageCircle} onClick={() => redirectToWhatsApp({ name: 'Facility Inquiry', class: 'General', phone: '' })}>
          Inquire Now
        </Button>
      </div>
    </motion.div>
  </motion.div>
);

// ==========================================
// TESTIMONIAL CARD
// ==========================================

const TestimonialCard = ({ text, name, role, index }: { text: string; name: string; role: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex-shrink-0 w-[320px] md:w-[400px] bg-white rounded-3xl p-6 md:p-8 shadow-lg shadow-gray-900/5 border border-gray-100"
  >
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-gray-700 mb-6 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <h5 className="font-bold text-gray-900">{name}</h5>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

// ==========================================
// HOME CONTENT
// ==========================================

const HomeContent = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80" 
            className="w-full h-full object-cover opacity-20"
            alt="Campus"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/60 to-transparent"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full py-32 md:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-full text-sm mb-6 border border-white/20"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Admissions Open 2026-27
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Where Excellence
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Meets Opportunity
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-lg leading-relaxed">
                Join Science Junction for world-class education with expert faculty, modern facilities, and a proven track record of success.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="white" icon={ArrowRight} onClick={() => redirectToWhatsApp({ name: 'Enquiry', class: 'General', phone: '' })}>
                  Apply Now
                </Button>
                <Button variant="outline-white" icon={Play}>
                  Watch Video
                </Button>
              </div>
            </motion.div>
            
            {/* Right Content - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={Users} value={500} suffix="+" label="Happy Students" delay={0.4} />
                <StatCard icon={Award} value={25} suffix="+" label="Expert Teachers" delay={0.5} />
                <StatCard icon={TrendingUp} value={95} suffix="%" label="Success Rate" delay={0.6} />
                <StatCard icon={Calendar} value={10} suffix="+" label="Years Legacy" delay={0.7} />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Mobile Stats */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 gap-4">
            {[
              { value: 500, label: 'Students', suffix: '+' },
              { value: 25, label: 'Teachers', suffix: '+' },
              { value: 95, label: 'Success', suffix: '%' },
              { value: 10, label: 'Years', suffix: '+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-purple-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                  alt="About Science Junction"
                  className="rounded-3xl shadow-2xl shadow-purple-900/20 w-full"
                />
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl shadow-gray-900/10 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center text-white">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-sm text-gray-500">Board Results</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-3xl -z-10"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <SectionHeader 
                badge="About Us" 
                title="Nurturing Potential, Achieving Excellence" 
                center={false}
              />
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Science Junction is a premier educational institution dedicated to providing quality education in Commerce and Science streams. Our mission is to nurture young minds and prepare them for future challenges through innovative teaching methods and personal attention.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: Target, title: 'Our Vision', desc: 'Holistic, value-based education for future leaders' },
                  { icon: Heart, title: 'Our Mission', desc: 'Strengthen conceptual learning with discipline' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="primary" icon={ArrowRight} onClick={() => redirectToWhatsApp({ name: 'Enquiry', class: 'General', phone: '' })}>
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader 
            badge="Academic Excellence" 
            title="Our Star Performers" 
            subtitle="Celebrating the achievements of our brilliant students"
            light
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Rahul Sharma', percentage: '98.5', year: '2025' },
              { name: 'Priya Singh', percentage: '97.8', year: '2025' },
              { name: 'Aryan Kumar', percentage: '97.2', year: '2024' },
            ].map((topper, i) => (
              <TopperCard key={i} {...topper} image={`/images/st${i + 1}.png`} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader 
            badge="Our Campus" 
            title="World-Class Facilities" 
            subtitle="Experience learning in state-of-the-art facilities designed for excellence"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, i) => (
              <FacilityCard 
                key={i} 
                facility={facility} 
                index={i} 
                onClick={() => setSelectedFacility(facility)}
              />
            ))}
          </div>
        </div>
        
        <AnimatePresence>
          {selectedFacility && (
            <FacilityModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
          )}
        </AnimatePresence>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader 
            badge="Why Choose Us" 
            title="The Science Junction Advantage" 
            subtitle="Discover what makes us the preferred choice for quality education"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Expert Faculty', description: 'Learn from experienced educators who provide personalized attention to each student.' },
              { icon: Monitor, title: 'Modern Infrastructure', description: 'Study in state-of-the-art classrooms equipped with latest technology.' },
              { icon: Trophy, title: 'Proven Results', description: 'Join our legacy of consistent outstanding board examination results.' },
              { icon: BookOpen, title: 'Comprehensive Curriculum', description: 'Well-structured syllabus covering all aspects of academic excellence.' },
              { icon: Shield, title: 'Safe Environment', description: 'Secure campus with 24/7 CCTV surveillance and trained personnel.' },
              { icon: Bus, title: 'Transport Facility', description: 'Safe and reliable GPS-tracked transportation across the city.' },
            ].map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader 
            badge="Testimonials" 
            title="What Parents Say" 
            subtitle="Hear from our satisfied parents about their experience"
          />
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {[
              { text: "Science Junction has transformed my child's academic journey. The faculty is exceptional and truly cares about each student's success.", name: "Rajesh Kumar", role: "Parent of Class 12 Student" },
              { text: "Best decision we made for our daughter's education. She's now confidently pursuing her dream career in commerce.", name: "Meena Sharma", role: "Parent of Class 11 Student" },
              { text: "Excellent infrastructure and teaching methodology. The school's focus on both academics and personality development is commendable.", name: "Amit Verma", role: "Parent of Class 10 Student" },
            ].map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Join Science Junction and embark on a journey towards academic excellence and a bright career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="white" icon={ArrowRight} onClick={() => redirectToWhatsApp({ name: 'Enquiry', class: 'General', phone: '' })}>
                Start Your Journey
              </Button>
              <a href="tel:+919314424404">
                <Button variant="outline-white" icon={Phone}>
                  Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ==========================================
// ABOUT CONTENT
// ==========================================

const AboutContent = () => (
  <section className="pt-24 md:pt-28">
    {/* Hero */}
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
            Discover the story behind Science Junction and our commitment to educational excellence.
          </p>
        </motion.div>
      </div>
    </div>
    
    {/* Content */}
    <div className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
              alt="About Science Junction"
              className="rounded-3xl shadow-2xl shadow-purple-900/20"
            />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-3xl -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-50 rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader badge="Our Story" title="A Legacy of Excellence" center={false} />
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Science Junction was founded with a vision to provide quality education that prepares students for real-world challenges. Over the years, we have built a reputation for academic excellence and holistic development.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to nurturing young minds has resulted in countless success stories, with our alumni excelling in various fields across the globe.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Vision', desc: 'Holistic education for future leaders' },
                { icon: Heart, title: 'Mission', desc: 'Conceptual learning with values' },
                { icon: Zap, title: 'Values', desc: 'Integrity, excellence, innovation' },
                { icon: Users, title: 'Community', desc: 'Supportive learning environment' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-purple-50 rounded-xl">
                  <item.icon className="text-purple-600 mb-2" size={24} />
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <SectionHeader badge="Why Choose Us" title="The Science Junction Advantage" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Users, title: 'Expert Faculty', description: 'Learn from experienced educators who provide personalized attention.' },
            { icon: Monitor, title: 'Modern Infrastructure', description: 'State-of-the-art classrooms with latest technology.' },
            { icon: Trophy, title: 'Proven Results', description: 'Consistent outstanding board examination results.' },
            { icon: BookOpen, title: 'Comprehensive Curriculum', description: 'Well-structured syllabus for academic excellence.' },
            { icon: Shield, title: 'Safe Environment', description: 'Secure campus with trained security personnel.' },
            { icon: Bus, title: 'Transport Facility', description: 'Safe GPS-tracked transportation across the city.' },
          ].map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// COURSES CONTENT
// ==========================================

const CoursesContent = () => {
  const [formData, setFormData] = useState({ name: '', class: '9th', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirectToWhatsApp(formData);
  };

  const courses = [
    { title: "Class 9-10", description: "Strong foundation for board examinations", subjects: ["Maths", "Science", "English", "SST"], icon: BookOpen, gradient: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { title: "11th Commerce", description: "Comprehensive commerce stream education", subjects: ["Accounts", "Business", "Economics", "Maths"], icon: TrendingUp, gradient: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { title: "12th Commerce", description: "Advanced preparation for board & competitive exams", subjects: ["Accounts", "Business", "Economics", "Maths"], icon: Award, gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    { title: "11th Science", description: "For medical and engineering aspirants", subjects: ["Physics", "Chemistry", "Biology", "Maths"], icon: Microscope, gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
    { title: "12th PCB", description: "Medical college preparation", subjects: ["Physics", "Chemistry", "Biology", "English"], icon: Heart, gradient: "bg-gradient-to-br from-rose-500 to-rose-600" },
    { title: "12th PCM", description: "Engineering college preparation", subjects: ["Physics", "Chemistry", "Maths", "English"], icon: Zap, gradient: "bg-gradient-to-br from-amber-500 to-amber-600" },
  ];

  return (
    <section className="pt-24 md:pt-28">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Courses</h1>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Choose from our comprehensive range of academic programs designed for success.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Courses Grid */}
      <div className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, i) => (
              <CourseCard key={i} {...course} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2">
              {/* Left */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Started Today</h2>
                <p className="text-purple-100 mb-8">Submit your details and our team will reach out to guide you through the admission process.</p>
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Submit Inquiry', desc: 'Fill the form with your details' },
                    { step: '02', title: 'Counseling', desc: 'Meet our academic advisors' },
                    { step: '03', title: 'Enrollment', desc: 'Complete the admission process' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="text-2xl font-bold text-purple-300">{item.step}</div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className="text-sm text-purple-200">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right */}
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Inquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class Interested In</label>
                    <select 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    >
                      <option>9th</option>
                      <option>10th</option>
                      <option>11th Science</option>
                      <option>11th Commerce</option>
                      <option>12th Science</option>
                      <option>12th Commerce</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                      placeholder="Enter mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <Button variant="primary" type="submit" className="w-full" icon={MessageCircle}>
                    Submit via WhatsApp
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// CONTACT CONTENT
// ==========================================

const ContactContent = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirectToWhatsApp({ 
      name: `${formData.firstName} ${formData.lastName}`, 
      class: 'General Inquiry', 
      phone: formData.email,
      message: formData.message 
    });
  };

  return (
    <section className="pt-24 md:pt-28">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Get in touch with us.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Content */}
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader badge="Get In Touch" title="Let's Connect" center={false} />
              <p className="text-gray-600 mb-8 text-lg">
                Whether you have questions about admissions, courses, or anything else, our team is ready to help.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { icon: MapPin, title: 'Address', info: 'Science Junction, Alwar, Rajasthan' },
                  { icon: Phone, title: 'Phone', info: '+91 93144 24404' },
                  { icon: Mail, title: 'Email', info: 'info@sciencejunction.com' },
                  { icon: Clock, title: 'Hours', info: 'Mon - Sat: 8:00 AM - 6:00 PM' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.info}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: MessageCircle, href: 'https://wa.me/919314424404' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John"
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Doe"
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <textarea 
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <Button variant="primary" type="submit" className="w-full" icon={MessageCircle}>
                  Send via WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// FOOTER
// ==========================================

const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/images/logo.png" 
              alt="Science Junction Logo" 
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <span className="font-bold text-lg">Science Junction</span>
              <span className="block text-xs text-gray-400">Excellence in Education</span>
            </div>
          </div>
          <p className="text-gray-400 max-w-sm">
            Nurturing young minds and preparing them for future success through quality education and holistic development.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <div className="space-y-2">
            {['Home', 'About', 'Courses', 'Contact'].map((link) => (
              <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">{link}</a>
            ))}
          </div>
        </div>
        
        {/* Contact */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <p>Alwar, Rajasthan</p>
            <p>+91 93144 24404</p>
            <p>info@sciencejunction.com</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">© 2026 Science Junction. All rights reserved.</p>
        <div className="flex gap-3">
          {[Facebook, Instagram, MessageCircle].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ==========================================
// FLOATING WHATSAPP
// ==========================================

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/919314424404"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center"
  >
    <MessageCircle size={28} />
    <span className="absolute w-full h-full bg-green-400 rounded-full animate-ping opacity-30"></span>
  </motion.a>
);

// ==========================================
// MAIN APP
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'home' && <HomeContent />}
          {activeTab === 'about' && <AboutContent />}
          {activeTab === 'courses' && <CoursesContent />}
          {activeTab === 'contact' && <ContactContent />}
        </motion.main>
      </AnimatePresence>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
