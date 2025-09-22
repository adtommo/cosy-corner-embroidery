import React, { useState } from 'react';
import { Mail, Phone, Clock, Heart, Star, Sparkles, MessageCircle, Users, HandHeart } from 'lucide-react';
import {SiFacebook} from '@icons-pack/react-simple-icons'
import logo from '/logo.jpg';
import { Avatar } from '@mui/material';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: ''
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email || !formData.projectType || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowAlert(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        projectType: '', description: '', timeline: '', budget: ''
      });
      setFiles(null);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services: Service[] = [
  { 
    icon: '👕', 
    title: 'Wearable Art', 
    description: 'Elevate your wardrobe with hand-embroidered designs on clothing and accessories. Whether you provide the item or choose one from my collection, each piece is crafted with care and attention to detail.',
    color: 'from-[#bba987]/30 to-[#bba987]/50'
  },
  { 
    icon: '🎁', 
    title: 'Personalised Gifts', 
    description: 'Celebrate life’s milestones with thoughtfully embroidered keepsakes. Each gift is customised to reflect your story, making it a meaningful treasure for years to come.',
    color: 'from-[#bba987]/40 to-[#bba987]/60'
  },
  { 
    icon: '🪡', 
    title: 'Custom Home Embroidery', 
    description: 'Add warmth and personality to your home with embroidered blankets, cushions, and décor. Each piece is carefully stitched to bring comfort and style to any space.',
    color: 'from-[#bba987]/35 to-[#bba987]/55'
  },
  { 
    icon: '✨', 
    title: 'One-of-a-Kind Creations', 
    description: 'Have a unique idea or design in mind? Let’s collaborate to create a completely custom, hand-embroidered piece that reflects your vision and individuality.',
    color: 'from-[#bba987]/45 to-[#bba987]/65'
  }
]
;

  return (
    <div className="min-h-screen bg-[#ede5d8] relative overflow-hidden">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#bba987] rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[#4e4637] rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-[#bba987] rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-[#bba987] rounded-full opacity-35 animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Success Alert */}
      {showAlert && (
        <div className="fixed top-8 right-8 z-50 max-w-sm">
          <div className="bg-white/95 backdrop-blur-lg border border-[#bba987]/30 rounded-2xl p-4 shadow-2xl animate-bounce">
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5 text-[#bba987] fill-current animate-pulse" />
              <div>
                <span className="font-semibold text-[#4e4637]">Thank you!</span>
                <p className="text-sm text-[#4e4637]/80">I'll get back to you within 24 hours with a custom quote.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ede5d8] via-[#bba987]/10 to-[#ede5d8]"></div>
        <div className="relative z-10">
          {/* Logo */}
          <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto mb-8 relative group">
  <div className="relative w-full h-full bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border border-[#bba987]/30 group-hover:scale-110 transition-transform duration-500">
    <Avatar
      variant="square"
      src={logo}
      alt="Cosy Corner Embroidery Logo"
      className="w-[96%] h-auto rounded-full"
    />
  </div>
</div>
          
          {/* Title */}          
          <p className="text-xl md:text-2xl text-[#4e4637]/80 max-w-2xl mx-auto leading-relaxed">
            Bringing comfort to your wardrobe, one stitch at a time.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button 
              onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-[#bba987] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-[#4e4637]"
            >
              Submit Order Request ✨
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/90 backdrop-blur-lg text-[#4e4637] rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-[#bba987]/50 hover:bg-[#bba987] hover:text-white"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-[#bba987]/10 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">
              Hi, I'm Ellie! 👋
            </h2>
            <div className="w-32 h-1 bg-[#bba987] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
                <p className="text-lg text-[#4e4637] leading-relaxed mb-6">
                  I believe in the magic of <span className="text-[#bba987] font-semibold">handmade beauty</span>. 
                  Every piece I create is infused with love, care, and countless hours of passionate craftsmanship.
                </p>
                <p className="text-lg text-[#4e4637] leading-relaxed mb-6">
                  From <span className="text-[#bba987] font-semibold">whimsical designs</span> to 
                  <span className="text-[#bba987] font-semibold"> elegant monograms</span>, I work to bring your vision to life.
                </p>
                <p className="text-lg text-[#4e4637] leading-relaxed">
                  Let's create something <span className="text-[#bba987] font-semibold"> extraordinary </span> together, something that will be treasured for years to come!
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {['Hand Stitched', 'Custom Designs', 'Personal Touch', 'Made with Love'].map((badge, index) => (
                  <span key={index} className="px-4 py-2 bg-[#bba987]/30 text-[#4e4637] rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:bg-[#bba987]/50 transition-all duration-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#bba987]/30 to-[#bba987]/50 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#bba987]/30 text-center transform hover:rotate-1 transition-transform duration-300">
                <div className="flex justify-center mb-6 "><HandHeart size={200}/></div>
                <h3 className="text-2xl font-serif text-[#4e4637] mb-4">Made with care</h3>
                <p className="text-[#4e4637]/80 italic">From my hands to yours</p>
                <div className="mt-6 flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#bba987] fill-current animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#bba987]/10 to-white/60"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">
              What I Create
            </h2>
            <div className="w-32 h-1 bg-[#bba987] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#bba987]/30 h-full text-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-6xl mb-6 group-hover:animate-bounce">{service.icon}</div>
                  <h3 className="text-xl font-serif text-[#4e4637] mb-4">{service.title}</h3>
                  <p className="text-[#4e4637]/80 leading-relaxed">{service.description}</p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 mx-auto text-[#bba987]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-[#bba987]/15"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">
              Order Request Form ✨
            </h2>
            <div className="w-32 h-1 bg-[#bba987] mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#bba987]/30 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-[#4e4637] font-medium">First Name *</div>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[#4e4637] font-medium">Last Name *</div>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#4e4637] font-medium flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address *</span>
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#4e4637] font-medium flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </div>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#4e4637] font-medium">Project Type *</div>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                  >
                    <option value="">Choose your magic ✨</option>
                    <option value="clothing">Clothing Embroidery</option>
                    <option value="home-decor">Home Decor</option>
                    <option value="gift">Personalized Gift</option>
                    <option value="custom">Custom Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#4e4637] font-medium">Tell me about your vision *</div>
                  <textarea 
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your dream project... the more details, the better! 💕"
                    className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300 resize-none"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-[#4e4637] font-medium flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>When do you need it?</span>
                    </div>
                    <input 
                      type="date" 
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[#4e4637] font-medium">Budget Range</div>
                    <select 
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                    >
                      <option value="">Select your range</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200+">$200+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#4e4637] font-medium">Inspiration Images (Optional)</div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-white/80 border border-[#bba987]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#bba987] transition-all duration-300"
                  />
                  {files && files.length > 0 && (
                    <p className="text-sm text-[#4e4637]/70 mt-2">
                      {files.length} file{files.length > 1 ? 's' : ''} selected ✨
                    </p>
                  )}
                </div>
                
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#bba987] to-[#4e4637] text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '✨ Creating Magic...' : '⭐️ Submit My Order Request ⭐️'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
<section id="contact" className="py-20 px-6 relative">
  <div className="absolute inset-0 bg-gradient-to-br from-[#bba987]/10 to-white/60"></div>
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h2 className="text-5xl font-serif text-[#4e4637] mb-16">
      Let's Connect 💕
    </h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Facebook - Follow */}
      <div
        onClick={() => window.open('https://www.facebook.com/profile.php?id=61580462263374')}
        className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300"
      >
        <SiFacebook className="w-8 h-8 mx-auto mb-4 text-[#bba987]" />
        <h3 className="text-xl font-semibold mb-4 text-[#4e4637]">Follow Us</h3>
        <p className="text-[#4e4637]/70">Stay updated with my latest creations!</p>
      </div>

      {/* Facebook - Message */}
      <div
        onClick={() => window.open('https://l.messenger.com/l.php?u=http%3A%2F%2Fmessenger.com%2Ft%2F814551985075042&h=AT0pHfWgPcueztFicSm6_IWBnnNjw4f4IlLPzC-WsubVWkh2v2_POeB316flb1NYou2TvZE93na0rQm1Dpg2aJIjNpJ1h4A1v_JYuB3ve87MtfV5YozgjCQ6ce9IlmqKbOUEU2bOzm-ywjkauqca-YNe_5M')}
        className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle className="w-8 h-8 mx-auto mb-4 text-[#bba987]" />
        <h3 className="text-xl font-semibold mb-4 text-[#4e4637]">Send a Message</h3>
        <p className="text-[#4e4637]/70">Reach out for custom requests or questions!</p>
      </div>

      {/* Facebook - Community / Reviews */}
      <div
        onClick={() => window.open('https://www.facebook.com/profile.php?id=61580462263374&sk=reviews')}
        className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300"
      >
        <Users className="w-8 h-8 mx-auto mb-4 text-[#bba987]" />
        <h3 className="text-xl font-semibold mb-4 text-[#4e4637]">See My Reviews</h3>
        <p className="text-[#4e4637]/70">Check out what my customers have to say about their custom creations!</p>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-br from-[#4e4637] to-[#bba987] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#bba987]/10 to-[#4e4637]/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-2xl font-serif mb-2">Cozy Corner Embroidery</h3>
            <p className="text-white/80">Bringing comfort to your wardrobe, one stitch at a time.</p>
          </div>
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/60">&copy; 2025 Cozy Corner Embroidery. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>
  {`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
  `}
</style>
    </div>
  );
};

export default HomePage;