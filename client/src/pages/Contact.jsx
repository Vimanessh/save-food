import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <div className="gradient-bg min-h-screen py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 mb-8 text-sm font-black tracking-widest text-primary-700 uppercase bg-white shadow-xl shadow-primary-100 rounded-full"
          >
            ✉️ Get In Touch
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">Contact Us 📞</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto italic font-medium">
            "Your feedback is the ingredient that makes us better." 🍲
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="glass-morphism p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-primary-500/10 w-32 h-32 rounded-bl-full -mr-10 -mt-10"></div>
              <h2 className="text-3xl font-black text-gray-900 mb-10">Direct Contact 👋</h2>
              <div className="space-y-10">
                {[
                  { icon: MapPin, title: 'Our Location 📍', desc: '242 Chennai, Tamil Nadu', color: 'primary' },
                  { icon: Phone, title: 'Phone Number 📱', desc: '+91 6385218882', color: 'green' },
                  { icon: Mail, title: 'Email Address 📧', desc: 'vimanessh31@gmail.com', color: 'blue' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className={`bg-${item.color}-100 p-5 rounded-2xl text-${item.color}-600 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300 shadow-sm`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-gray-900 mb-1">{item.title}</p>
                      <p className="text-lg text-gray-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-primary-600 to-green-700 p-12 rounded-[3rem] shadow-2xl text-white relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <h3 className="text-3xl font-black mb-8 flex items-center gap-3">Working Hours ⏰</h3>
              <div className="space-y-6">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed 🏠', isClosed: true }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="text-lg font-bold text-primary-50">{item.day}</span>
                    <span className={`text-lg font-black ${item.isClosed ? 'text-red-200' : 'text-white'}`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-12 rounded-[3rem] shadow-2xl border border-white/50"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-10">Send a Message 🚀</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-2">Full Name 👤</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-lg"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-2">Email Address ✉️</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-lg"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-2">Subject 📝</label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-lg"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500 ml-2">Message 💬</label>
                <textarea 
                  rows="6" 
                  placeholder="Tell us more about your inquiry..." 
                  className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-bold text-lg resize-none"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-6 text-xl shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] flex items-center justify-center gap-4">
                <Send className="h-6 w-6" /> Send Message 🚀
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
