import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, 
  BookOpen, Users, Award, Microscope, Shield, 
  Bus, Library, Monitor, Trophy, CheckCircle2,
  ArrowRight, Facebook, Instagram, MessageCircle,
  Home, GraduationCap, Info, Contact as ContactIcon
} from 'lucide-react';

// --- Components ---

// WhatsApp redirect function
const redirectToWhatsApp = (formData: { name: string; class: string; phone: string; message?: string }) => {
  const phoneNumber = "919314424404"; // Replace with actual WhatsApp number
  const message = `Hello Commerce Junction,\n\nI am interested in getting more information.\n\nName: ${formData.name}\nClass: ${formData.class}\nPhone: ${formData.phone}${formData.message ? `\nMessage: ${formData.message}` : ''}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: ContactIcon },
  ];

  return (
    <div className="flex gap-2 bg-purple-100 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-700 hover:bg-purple-200'
          }`}
        >
          <tab.icon size={18} />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Navbar Component
const Navbar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-purple-900'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">CJ</div>
          <div className="flex flex-col">
            <span className={`font-display font-bold text-lg leading-none ${isScrolled ? 'text-purple-800' : 'text-white'}`}>COMMERCE JUNCTION</span>
            <span className={`text-[10px] font-medium tracking-widest ${isScrolled ? 'text-purple-500' : 'text-purple-200'}`}>SCIENCE JUNCTION</span>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-purple-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Counter Component
const Counter = ({ value, label, suffix = "" }: { value: string; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMiliseconds = 2000;
    let incrementTime = (totalMiliseconds / end);

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-purple-300 font-medium uppercase tracking-wider text-sm">{label}</div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ title, description, subjects, icon: Icon, color }: { title: string; description: string; subjects: string[]; icon: any; color: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100 flex flex-col h-full"
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${color}`}>
      <Icon className="text-white" size={28} />
    </div>
    <h3 className="text-2xl font-bold text-purple-800 mb-4">{title}</h3>
    <p className="text-purple-600 mb-6 flex-grow">{description}</p>
    <div className="space-y-2">
      <p className="font-bold text-sm text-purple-400 uppercase tracking-widest mb-3">Core Subjects</p>
      {subjects.map((sub) => (
        <div key={sub} className="flex items-center gap-2 text-purple-700">
          <CheckCircle2 size={16} className="text-purple-600" />
          <span className="text-sm font-medium">{sub}</span>
        </div>
      ))}
    </div>
    <button className="mt-8 flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800 transition-colors group">
      Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

// Feature Box Component
const FeatureBox = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex gap-6 p-6 rounded-2xl hover:bg-purple-50 transition-colors"
  >
    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-xl font-bold text-purple-800 mb-2">{title}</h4>
      <p className="text-purple-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Topper Card Component
const TopperCard = ({ name, percentage, year, image }: { name: string; percentage: string; year: string; image: string }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-purple-100 group">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-purple-600 text-white font-bold px-3 py-1 rounded-full text-sm">
        {percentage}%
      </div>
    </div>
    <div className="p-6 text-center">
      <h4 className="text-xl font-bold text-purple-800 mb-1">{name}</h4>
      <p className="text-purple-400 text-sm font-medium uppercase tracking-wider">{year} Board Result</p>
    </div>
  </div>
);

// --- Tab Contents ---

// Home Tab Content
const HomeContent = () => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center overflow-hidden bg-purple-900 pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80" 
          className="w-full h-full object-cover opacity-30"
          alt="School Campus"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-600/70"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-purple-500/30 text-white font-bold px-4 py-1 rounded-full text-sm mb-6 border border-purple-400/50 backdrop-blur-sm">
            ADMISSIONS OPEN 2026-27
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
            Shaping Future Leaders in <span className="text-purple-300">Commerce & Science</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 max-w-2xl">
            Excellence in education with expert faculty, modern facilities, and a commitment to nurturing bright futures.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-purple-700 font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all shadow-lg hover:scale-105 flex items-center gap-2"
            >
              Apply for Admission <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-purple-800/60 backdrop-blur-xl border-t border-purple-500/20 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <Counter value="500" label="Students" />
          <Counter value="25" label="Teachers" />
          <Counter value="95" label="Success Rate" suffix="%" />
          <Counter value="10" label="Years" />
        </div>
      </div>
    </section>

    {/* About Preview Section */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-200 rounded-2xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
              alt="About Commerce Junction"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>

          <div className="order-1 md:order-2">
            <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">About Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-purple-800 mb-4 md:mb-6 leading-tight">
              Nurturing Potential, Achieving Excellence
            </h2>
            <p className="text-purple-600 mb-6 leading-relaxed">
              Commerce Junction is a premier educational institution dedicated to providing quality education in Commerce and Science streams. Our mission is to nurture young minds and prepare them for future challenges.
            </p>
            <button className="bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Academic Highlights */}
    <section className="section-padding bg-purple-600 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-purple-200 font-bold uppercase tracking-widest text-sm mb-4 block">Academic Excellence</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">Our Top Performers</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { name: 'Rahul Sharma', percentage: '98.5', year: '2025' },
            { name: 'Priya Singh', percentage: '97.8', year: '2025' },
            { name: 'Aryan Kumar', percentage: '97.2', year: '2024' },
          ].map((topper, i) => (
            <TopperCard key={i} {...topper} image={`https://i.pravatar.cc/400?img=${i + 10}`} />
          ))}
        </div>
      </div>
    </section>

    {/* Facilities Section */}
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">Our Campus</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-purple-800 mb-4 md:mb-6">World-Class Facilities</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Library, name: 'Smart Classrooms' },
            { icon: Microscope, name: 'Science Labs' },
            { icon: Monitor, name: 'Computer Lab' },
            { icon: Bus, name: 'Transport' },
            { icon: BookOpen, name: 'Library' },
            { icon: Trophy, name: 'Sports' },
            { icon: Shield, name: 'Security' },
            { icon: Users, name: 'Student Support' },
          ].map((facility, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 bg-purple-50 rounded-2xl text-center hover:bg-purple-600 hover:text-white transition-all group cursor-default"
            >
              <facility.icon className="mx-auto mb-3 md:mb-4 text-purple-600 group-hover:text-white" size={36} md:size={40} />
              <h4 className="font-bold text-lg">{facility.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="section-padding bg-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-purple-800 mb-4 md:mb-6">The Junction of Excellence</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureBox icon={Users} title="Expert Faculty" description="Our experienced teachers provide personalized attention to each student." />
          <FeatureBox icon={Monitor} title="Modern Infrastructure" description="State-of-the-art classrooms and labs equipped with latest technology." />
          <FeatureBox icon={Trophy} title="Proven Results" description="Consistent outstanding results in board examinations year after year." />
          <FeatureBox icon={BookOpen} title="Comprehensive Curriculum" description="Well-structured syllabus covering all aspects of academics." />
          <FeatureBox icon={Shield} title="Safe Environment" description="Secure campus with CCTV surveillance and trained security personnel." />
          <FeatureBox icon={Bus} title="Transport Facility" description="Safe and reliable transportation available for students across the city." />
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-purple-800 mb-4 md:mb-6">What Parents Say</h2>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide px-2">
          {[
            { text: "Commerce Junction has transformed my child's academic journey. The faculty is exceptional!", parent: "Parent of Class 12th Student" },
            { text: "Best decision we made for our daughter's education. She is now pursuing her dream course.", parent: "Parent of Class 11th Student" },
            { text: "Excellent infrastructure and teaching methodology. Highly recommended for quality education.", parent: "Parent of Class 10th Student" },
          ].map((testimonial, i) => (
            <div key={i} className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[450px] p-6 md:p-8 bg-purple-50 rounded-3xl border border-purple-100">
              <div className="flex gap-1 text-purple-500 mb-4">
                {[...Array(5)].map((_, i) => <Award key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-purple-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm md:text-base">
                  {testimonial.parent.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-purple-800 text-sm md:text-base">{testimonial.parent}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="section-padding bg-purple-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
          Ready to Shape Your Future?
        </h2>
        <p className="text-lg md:text-xl text-purple-200 mb-6 md:mb-8">
          Join Commerce Junction and embark on a journey towards academic excellence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-purple-700 font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-purple-100 transition-colors">
            Apply Now
          </button>
          <button className="border-2 border-white text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white hover:text-purple-700 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  </>
);

// About Tab Content
const AboutContent = () => (
  <section className="pt-24 section-padding bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-2xl -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-full -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
            alt="About Commerce Junction"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">About Commerce Junction</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-purple-800 mb-8 leading-tight">
            Nurturing Potential, Achieving Excellence
          </h2>
          <p className="text-purple-600 text-lg mb-8 leading-relaxed">
            Commerce Junction is a premier educational institution dedicated to providing quality education in Commerce and Science streams. Our mission is to nurture young minds and prepare them for future challenges.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 size={14} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-purple-800">Our Vision</h4>
                <p className="text-sm text-purple-500">Holistic, value-based, and result-oriented education.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 size={14} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-purple-800">Our Mission</h4>
                <p className="text-sm text-purple-500">Strengthen conceptual learning and discipline.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-16">
        <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">Why Choose Us</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-purple-800 mb-8">The Junction of Excellence</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureBox icon={Users} title="Expert Faculty" description="Our experienced teachers provide personalized attention to each student." />
        <FeatureBox icon={Monitor} title="Modern Infrastructure" description="State-of-the-art classrooms and labs equipped with latest technology." />
        <FeatureBox icon={Trophy} title="Proven Results" description="Consistent outstanding results in board examinations year after year." />
        <FeatureBox icon={BookOpen} title="Comprehensive Curriculum" description="Well-structured syllabus covering all aspects of academics." />
        <FeatureBox icon={Shield} title="Safe Environment" description="Secure campus with CCTV surveillance and trained security personnel." />
        <FeatureBox icon={Bus} title="Transport Facility" description="Safe and reliable transportation available for students across the city." />
      </div>
    </div>
  </section>
);

// Courses Tab Content
const CoursesContent = () => {
  const [formData, setFormData] = useState({ name: '', class: '9th', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    redirectToWhatsApp({ ...formData, class: formData.class });
  };

  return (
    <section className="pt-24 section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-500 font-bold uppercase tracking-widest text-sm mb-4 block">Our Curriculum</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-purple-800 mb-6">Academic Streams</h2>
          <p className="text-purple-600 text-lg max-w-2xl mx-auto">
            Choose the right stream for your future. We offer comprehensive programs in both Commerce and Science streams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <CourseCard 
            title="Class 9-10"
            description="Foundation batch preparing students for Board examinations with strong conceptual base."
            subjects={["Mathematics", "Science", "English", "Social Science", "Hindi"]}
            icon={BookOpen}
            color="bg-purple-600"
          />
          <CourseCard 
            title="11th Commerce"
            description="Comprehensive Commerce stream with Accountancy, Business Studies, and Economics."
            subjects={["Accountancy", "Business Studies", "Economics", "Mathematics", "English"]}
            icon={Monitor}
            color="bg-purple-700"
          />
          <CourseCard 
            title="12th Commerce"
            description="Advanced Commerce preparation for board exams and competitive examinations."
            subjects={["Accountancy", "Business Studies", "Economics", "Mathematics", "English"]}
            icon={Award}
            color="bg-purple-800"
          />
          <CourseCard 
            title="11th Science"
            description="Science stream with Physics, Chemistry, Biology and Mathematics for medical and engineering aspirants."
            subjects={["Physics", "Chemistry", "Biology", "Mathematics", "English"]}
            icon={Microscope}
            color="bg-violet-600"
          />
          <CourseCard 
            title="12th Science (PCB)"
            description="Physics, Chemistry, Biology for medical college aspirants."
            subjects={["Physics", "Chemistry", "Biology", "English"]}
            icon={Shield}
            color="bg-violet-700"
          />
          <CourseCard 
            title="12th Science (PCM)"
            description="Physics, Chemistry, Mathematics for engineering college aspirants."
            subjects={["Physics", "Chemistry", "Mathematics", "English"]}
            icon={Monitor}
            color="bg-violet-800"
          />
        </div>

        {/* Inquiry Form */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-purple-100">
          <div className="md:w-1/2 p-10 md:p-16 bg-purple-600 text-white">
            <h2 className="text-4xl font-display font-bold mb-8">Get In Touch</h2>
            <p className="text-purple-100 mb-8">Have questions? We're here to help! Submit your details and we'll reach out to you.</p>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Online Inquiry', desc: 'Fill out the basic information form.' },
                { step: '02', title: 'Counseling Session', desc: 'Meet our experts to discuss the curriculum.' },
                { step: '03', title: 'Admission', desc: 'Complete the enrollment process.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="text-3xl font-bold text-purple-300 opacity-50">{item.step}</div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-purple-200">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-10 md:p-16">
            <h3 className="text-2xl font-bold text-purple-800 mb-6">Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-1">Student Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-1">Class Seeking</label>
                <select 
                  className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                >
                  <option>9th</option>
                  <option>10th</option>
                  <option>11th (Science)</option>
                  <option>11th (Commerce)</option>
                  <option>12th (Science)</option>
                  <option>12th (Commerce)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-colors mt-4 flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Tab Content
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
    <section className="pt-24 section-padding bg-purple-900 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-purple-300 font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Let's Connect</h2>
          <p className="text-purple-200 mb-12 text-lg">
            Have questions about admissions, courses, or any other inquiry? We'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-purple-800 rounded-xl flex items-center justify-center text-purple-300">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Address</h4>
                <p className="text-purple-200">Commerce Junction, Alwar, Rajasthan</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-purple-800 rounded-xl flex items-center justify-center text-purple-300">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Phone</h4>
                <p className="text-purple-200">+91 93144 24404</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-purple-800 rounded-xl flex items-center justify-center text-purple-300">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email</h4>
                <p className="text-purple-200">info@commercejunction.com</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <a href="#" className="w-12 h-12 bg-purple-800 hover:bg-white hover:text-purple-600 transition-all rounded-full flex items-center justify-center">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-12 h-12 bg-purple-800 hover:bg-white hover:text-purple-600 transition-all rounded-full flex items-center justify-center">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/919314424404" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-purple-800 hover:bg-white hover:text-purple-600 transition-all rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                required
                placeholder="First Name" 
                className="w-full p-4 bg-purple-800/50 border border-purple-600 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-300"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input 
                type="text" 
                required
                placeholder="Last Name" 
                className="w-full p-4 bg-purple-800/50 border border-purple-600 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-300"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <input 
              type="email" 
              required
              placeholder="Email Address" 
              className="w-full p-4 bg-purple-800/50 border border-purple-600 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <textarea 
              placeholder="Your Message" 
              rows={4} 
              className="w-full p-4 bg-purple-800/50 border border-purple-600 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-300"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
            <button type="submit" className="w-full bg-white text-purple-700 font-bold py-4 rounded-xl hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-purple-950 text-purple-300 py-12 border-t border-purple-800">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
      <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-bold">CJ</div>
        <span className="font-display font-bold text-white">COMMERCE JUNCTION</span>
      </div>
      <p className="text-sm">© 2026 Commerce Junction. All rights reserved.</p>
    </div>
  </footer>
);

// Floating WhatsApp Button
const FloatingWhatsApp = () => (
  <div className="fixed bottom-8 right-8 z-40">
    <motion.a
      href="https://wa.me/919314424404"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation */}
      <span className="absolute w-16 h-16 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
      {/* Main button */}
      <span className="relative w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
        <MessageCircle size={28} />
      </span>
    </motion.a>
    {/* Tooltip */}
    <motion.div
      className="absolute right-16 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap"
      initial={{ opacity: 0, x: 10 }}
      whileHover={{ opacity: 1, x: 0 }}
    >
      Chat on WhatsApp
    </motion.div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'home' && <HomeContent />}
          {activeTab === 'about' && <AboutContent />}
          {activeTab === 'courses' && <CoursesContent />}
          {activeTab === 'contact' && <ContactContent />}
        </motion.div>
      </AnimatePresence>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
