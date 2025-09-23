import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Users, HandHeart, Star } from 'lucide-react';
import { SiFacebook } from '@icons-pack/react-simple-icons';
import logo from '/logo.jpg';
import { Avatar } from '@mui/material';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // Reduced to 5MB for safety
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per file

// Enhanced image compression
const compressImage = (
  file: File,
  maxWidth = 800, // Reduced from 1200
  quality = 0.6 // Reduced from 0.7
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
      if (!e.target?.result) return reject('Failed to read file');
      img.src = e.target.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // More aggressive resizing
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = (width * maxWidth) / height;
          height = maxWidth;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Failed to get canvas context');

      // Improve image quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (!blob) return reject('Compression failed');
          
          // Create a new file name to indicate compression
          const compressedName = file.name.replace(/\.(jpg|jpeg|png|webp)$/i, '_compressed.$1');
          const compressedFile = new File([blob], compressedName, { 
            type: file.type || 'image/jpeg' 
          });
          
          console.log(`Compressed ${file.name}: ${(file.size/1024).toFixed(1)}KB → ${(compressedFile.size/1024).toFixed(1)}KB`);
          resolve(compressedFile);
        },
        file.type || 'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject('Image loading failed');
    reader.onerror = () => reject('File reading failed');
    reader.readAsDataURL(file);
  });
};

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [totalSize, setTotalSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressing(true);
    const compressedFiles: File[] = [];
    let newTotalSize = totalSize;
    let skippedFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        skippedFiles.push(`${file.name} (not an image)`);
        continue;
      }

      // Check individual file size before compression
      if (file.size > 10 * 1024 * 1024) { // 10MB limit before compression
        skippedFiles.push(`${file.name} (too large: ${(file.size/1024/1024).toFixed(1)}MB)`);
        continue;
      }

      try {
        const compressed = await compressImage(file);
        
        // Check if compressed file still too large
        if (compressed.size > MAX_FILE_SIZE) {
          skippedFiles.push(`${file.name} (still too large after compression)`);
          continue;
        }

        // Check total size
        if (newTotalSize + compressed.size > MAX_TOTAL_SIZE) {
          skippedFiles.push(`${file.name} (would exceed total size limit)`);
          continue;
        }

        newTotalSize += compressed.size;
        compressedFiles.push(compressed);
        
      } catch (error) {
        console.warn(`Failed to compress ${file.name}:`, error);
        skippedFiles.push(`${file.name} (compression failed)`);
      }
    }

    if (compressedFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...compressedFiles]);
      setTotalSize(newTotalSize);
    }

    if (skippedFiles.length > 0) {
      alert(`Some files were skipped:\n${skippedFiles.join('\n')}`);
    }

    setIsCompressing(false);
    
    // Reset the file input
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const removed = selectedFiles[index];
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setTotalSize(prev => prev - removed.size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      alert('Please enter your first name.');
      return;
    }
    
    if (!formData.email.trim()) {
      alert('Please enter your email address.');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please describe your project.');
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      alert(`Total file size (${(totalSize/1024/1024).toFixed(1)}MB) exceeds the 5MB limit. Please remove some files.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      
      // Add form data
      payload.append('firstName', formData.firstName.trim());
      payload.append('lastName', formData.lastName.trim());
      payload.append('email', formData.email.trim());
      payload.append('phone', formData.phone.trim());
      payload.append('description', formData.description.trim());
      
      // Add files
      selectedFiles.forEach((file) => {
        payload.append('files', file, file.name);
      });

      console.log('Submitting form with:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        description: formData.description.substring(0, 100) + '...',
        fileCount: selectedFiles.length,
        totalSize: `${(totalSize/1024/1024).toFixed(1)}MB`
      });

      const response = await fetch('/api/send', { 
        method: 'POST', 
        body: payload 
      });
      
      const result = await response.json();

      if (response.ok) {
        // Success
        setFormData({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          phone: '', 
          description: '' 
        });
        setSelectedFiles([]);
        setTotalSize(0);
        setAlertMessage('Your order request has been sent successfully! I\'ll get back to you within 24 hours with a custom quote ✨');
        setShowAlert(true);
      } else {
        // Error from server
        console.error('Server error:', result);
        setAlertMessage(result?.message || `Failed to send order request. Please try again or contact us directly.`);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Network error:', error);
      setAlertMessage('Network error. Please check your connection and try again.');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services: Service[] = [
    { icon: '👕', title: 'Wearable Art', description: 'Elevate your wardrobe with hand-embroidered designs.', color: 'from-[#bba987]/30 to-[#bba987]/50' },
    { icon: '🎁', title: 'Personalised Gifts', description: `Celebrate life's milestones with embroidered keepsakes.`, color: 'from-[#bba987]/40 to-[#bba987]/60' },
    { icon: '🪡', title: 'Custom Home Embroidery', description: 'Add warmth to your home with embroidered décor.', color: 'from-[#bba987]/35 to-[#bba987]/55' },
    { icon: '✨', title: 'One-of-a-Kind Creations', description: 'Collaborate on unique hand-embroidered pieces.', color: 'from-[#bba987]/45 to-[#bba987]/65' }
  ];

  return (
    <div className="min-h-screen bg-[#ede5d8] relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center min-h-screen flex flex-col justify-center">
        <div className="relative z-10">
          <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto mb-8 relative group">
            <div className="relative w-full h-full bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border border-[#bba987]/30 group-hover:scale-110 transition-transform duration-500">
              <Avatar variant="square" src={logo} alt="Cosy Corner Logo" className="w-[96%] h-auto rounded-full" />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-[#4e4637]/80 max-w-2xl mx-auto leading-relaxed">
            Bringing comfort to your wardrobe, one stitch at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#bba987] text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-[#4e4637]">
              Submit Order Request ✨
            </button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/90 backdrop-blur-lg text-[#4e4637] rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-[#bba987]/50 hover:bg-[#bba987] hover:text-white">
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 relative">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">Hi, I'm Ellie! 👋</h2>
            <div className="w-32 h-1 bg-[#bba987] mx-auto rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
                <p className="text-lg text-[#4e4637] leading-relaxed mb-6">
                  I believe in the magic of <span className="text-[#bba987] font-semibold">handmade beauty</span>. Every piece I create is infused with love, care, and countless hours of passionate craftsmanship.
                </p>
                <p className="text-lg text-[#4e4637] leading-relaxed mb-6">
                  From <span className="text-[#bba987] font-semibold">whimsical designs</span> to <span className="text-[#bba987] font-semibold">elegant monograms</span>, I work to bring your vision to life.
                </p>
                <p className="text-lg text-[#4e4637] leading-relaxed">
                  Let's create something <span className="text-[#bba987] font-semibold">extraordinary</span> together, something that will be treasured for years to come!
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
                <div className="flex justify-center mb-6">
                  <HandHeart size={200} />
                </div>
                <h3 className="text-2xl font-serif text-[#4e4637] mb-4">Made with care</h3>
                <p className="text-[#4e4637]/80 italic">From my hands to yours</p>
                <div className="mt-6 flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#bba987] fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">What I Create</h2>
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

      {/* Order Form Section */}
      <section id="order" className="py-20 px-6 relative">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4e4637] mb-6">Order Request Form ✨</h2>
            <p className="text-[#4e4637]/70 max-w-2xl mx-auto">
              Tell me about your dream embroidery project! Include as many details as possible and attach reference images if you have them.
            </p>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#bba987]/30 overflow-hidden p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="firstName" 
                  placeholder="First Name*" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  className="p-4 rounded-xl border border-[#bba987]/50 w-full focus:outline-none focus:ring-2 focus:ring-[#bba987] focus:border-transparent" 
                  required 
                />
                <input 
                  type="text" 
                  name="lastName" 
                  placeholder="Last Name" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  className="p-4 rounded-xl border border-[#bba987]/50 w-full focus:outline-none focus:ring-2 focus:ring-[#bba987] focus:border-transparent" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email*" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="p-4 rounded-xl border border-[#bba987]/50 w-full focus:outline-none focus:ring-2 focus:ring-[#bba987] focus:border-transparent" 
                  required 
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone (optional)" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className="p-4 rounded-xl border border-[#bba987]/50 w-full focus:outline-none focus:ring-2 focus:ring-[#bba987] focus:border-transparent" 
                />
              </div>
              <textarea 
                name="description" 
                placeholder="Project Description* - Tell me about your vision, colors, size, timeline, etc." 
                value={formData.description} 
                onChange={handleInputChange} 
                className="p-4 rounded-xl border border-[#bba987]/50 w-full h-32 focus:outline-none focus:ring-2 focus:ring-[#bba987] focus:border-transparent resize-none" 
                required 
              />

              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="w-full p-6 border-2 border-dashed border-[#bba987]/50 rounded-xl bg-white/80 cursor-pointer flex flex-col items-center justify-center hover:border-[#bba987] hover:bg-[#bba987]/5 transition-all duration-300 relative">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-[#4e4637] font-medium">
                      {selectedFiles.length > 0 ? 'Add More Reference Images' : 'Upload Reference Images'}
                    </p>
                    <p className="text-[#4e4637]/60 text-sm mt-1">
                      Images will be automatically compressed • Max 5MB total
                    </p>
                  </div>
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    disabled={isCompressing || isSubmitting}
                  />
                  {isCompressing && (
                    <div className="absolute inset-0 bg-white/90 rounded-xl flex items-center justify-center">
                      <div className="text-[#bba987] font-medium">Compressing images...</div>
                    </div>
                  )}
                </label>
                
                {selectedFiles.length > 0 && (
                  <div className="bg-[#bba987]/10 rounded-xl p-4">
                    <p className="text-[#4e4637]/70 text-sm mb-3">
                      Selected files ({selectedFiles.length}) • Total size: {(totalSize / 1024 / 1024).toFixed(1)} MB / 5.0 MB
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedFiles.map((file, i) => (
                        <div key={i} className="relative group">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#bba987]/30">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={`preview-${i}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeFile(i)} 
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors duration-200"
                            title="Remove image"
                          >
                            ×
                          </button>
                          <p className="text-xs text-[#4e4637]/60 mt-1 max-w-20 truncate">
                            {(file.size / 1024).toFixed(0)}KB
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isCompressing} 
                className="w-full py-4 bg-gradient-to-r from-[#bba987] to-[#4e4637] text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? '✨ Sending Your Request...' : '⭐️ Submit My Order Request ⭐️'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl text-center animate-fadeIn">
            <Heart className="w-12 h-12 text-[#bba987] mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-semibold text-[#4e4637] mb-4">
              {alertMessage.includes('successfully') ? 'Thank You!' : 'Oops!'}
            </h3>
            <p className="text-[#4e4637]/80 mb-6 leading-relaxed">
              {alertMessage}
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="px-6 py-3 bg-[#bba987] text-white rounded-full font-semibold hover:bg-[#4e4637] transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif text-[#4e4637] mb-16">Let's Connect 💕</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div onClick={() => window.open('https://www.facebook.com/profile.php?id=61580462263374')} className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
              <SiFacebook className="w-8 h-8 mx-auto mb-4 text-[#bba987]" />
              <h3 className="text-xl font-semibold mb-4 text-[#4e4637]">Follow Us</h3>
              <p className="text-[#4e4637]/70">Stay updated with my latest creations!</p>
            </div>
            <div onClick={() => window.open('https://m.me/embroiderycosycorner')} className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
              <MessageCircle className="w-8 h-8 mx-auto mb-4 text-[#bba987]" />
              <h3 className="text-xl font-semibold mb-4 text-[#4e4637]">Send a Message</h3>
              <p className="text-[#4e4637]/70">Reach out for custom requests or questions!</p>
            </div>
            <div onClick={() => window.open('https://www.facebook.com/profile.php?id=61580462263374&sk=reviews')} className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
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
            <h3 className="text-2xl font-serif mb-2">Cosy Corner Embroidery</h3>
            <p className="text-[#fff]/80">Handmade embroidery to warm your heart & home</p>
          </div>
          <p className="text-[#fff]/70 mt-6">&copy; 2025 Cosy Corner Embroidery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;