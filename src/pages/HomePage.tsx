import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Users } from 'lucide-react';
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

const MAX_TOTAL_SIZE = 8 * 1024 * 1024; // 8 MB safe limit

// Utility: compress image using canvas
const compressImage = (
  file: File,
  maxWidth = 1200,
  quality = 0.7
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

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Failed to get canvas context');

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        blob => {
          if (!blob) return reject('Compression failed');
          resolve(new File([blob], file.name, { type: file.type }));
        },
        file.type,
        quality
      );
    };

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
  const [totalSize, setTotalSize] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const compressedFiles: File[] = [];
    let newTotalSize = totalSize;

    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImage(files[i]);
        newTotalSize += compressed.size;
        if (newTotalSize > MAX_TOTAL_SIZE) {
          alert('Total file size exceeds 8 MB. Remove some files or choose smaller images.');
          break;
        }
        compressedFiles.push(compressed);
      } catch {
        console.warn(`Failed to compress ${files[i].name}`);
      }
    }

    setSelectedFiles(prev => [...prev, ...compressedFiles]);
    setTotalSize(prev => prev + compressedFiles.reduce((acc, f) => acc + f.size, 0));
  };

  const removeFile = (index: number) => {
    const removed = selectedFiles[index];
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setTotalSize(prev => prev - removed.size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      alert('Total file size exceeds 8 MB. Remove some files before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      selectedFiles.forEach(file => payload.append('files', file));

      const response = await fetch('/api/send', { method: 'POST', body: payload });
      const result = await response.json();

      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', phone: '', description: '' });
        setSelectedFiles([]);
        setTotalSize(0);
        setShowAlert(true);
      } else {
        alert(result?.message || 'Form submission failed');
      }
    } catch {
      alert('Error submitting form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services: Service[] = [
    { icon: '👕', title: 'Wearable Art', description: 'Elevate your wardrobe with hand-embroidered designs.', color: 'from-[#bba987]/30 to-[#bba987]/50' },
    { icon: '🎁', title: 'Personalised Gifts', description: 'Celebrate life’s milestones with embroidered keepsakes.', color: 'from-[#bba987]/40 to-[#bba987]/60' },
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
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#bba987]/30 overflow-hidden p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} className="p-4 rounded-xl border border-[#bba987]/50 w-full" required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} className="p-4 rounded-xl border border-[#bba987]/50 w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} className="p-4 rounded-xl border border-[#bba987]/50 w-full" required />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="p-4 rounded-xl border border-[#bba987]/50 w-full" />
              </div>
              <textarea name="description" placeholder="Project Description*" value={formData.description} onChange={handleInputChange} className="p-4 rounded-xl border border-[#bba987]/50 w-full h-32" required />

              {/* File Picker */}
              <label className="w-full p-4 border border-[#bba987]/50 rounded-xl bg-white/80 cursor-pointer flex justify-center items-center">
                {selectedFiles.length > 0 ? 'Add more files' : 'Choose files'}
                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
              {selectedFiles.length > 0 && (
                <p className="text-[#4e4637]/70 mt-2 text-sm">
                  Total size: {(totalSize / 1024 / 1024).toFixed(2)} MB / 8 MB
                </p>
              )}

              {/* File Previews */}
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {selectedFiles.map((file, i) => (
                    <div key={i} className="relative w-24 h-24">
                      <img src={URL.createObjectURL(file)} alt={`preview-${i}`} className="w-full h-full object-cover rounded-xl border border-[#bba987]/50" />
                      <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✕</button>
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-[#bba987] to-[#4e4637] text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? '✨ Submitting...' : '⭐️ Submit My Order Request ⭐️'}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* Thank You Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl text-center animate-fadeIn">
            <Heart className="w-12 h-12 text-[#bba987] mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-semibold text-[#4e4637] mb-2">Thank You!</h3>
            <p className="text-[#4e4637]/80 mb-6">
              Your order request has been sent. I’ll get back to you within 24 hours with a custom quote ✨
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
            <div onClick={() => window.open('https://l.messenger.com')} className="bg-white/80 backdrop-blur-lg cursor-pointer rounded-3xl p-8 shadow-xl border border-[#bba987]/30 transform hover:scale-105 transition-transform duration-300">
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
