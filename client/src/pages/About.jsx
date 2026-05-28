import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="gradient-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary-700 uppercase bg-primary-100 rounded-full"
          >
            🌟 Our Story
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">About Save Food 🌿</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto italic font-medium leading-relaxed">
            "We are not just a platform; we are a movement to end hunger and waste." 🌍
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Our Mission" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 glass-morphism p-8 rounded-[2rem] shadow-2xl hidden lg:block z-20">
              <p className="text-lg font-black text-gray-800">Founded with Love ❤️</p>
              <p className="text-sm font-bold text-primary-600 uppercase tracking-widest">Since 2024</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-black text-gray-900 leading-tight">Our Mission 🎯</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              "To ensure that no good food goes to waste while someone goes hungry." — Our core philosophy. 🍎
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Every day, tons of perfectly good food are thrown away while millions of people go hungry. Our mission is to bridge this gap by creating a seamless platform for food donation. 🤝
            </p>
            
            <div className="space-y-6">
              {[
                { text: 'Reducing environmental impact of food waste 🌍', icon: '🌍' },
                { text: 'Providing nutritious meals to those in need 🥗', icon: '🥗' },
                { text: 'Building a community of conscious donors 🏠', icon: '🏠' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 bg-white/50 p-4 rounded-2xl border border-white/50 hover:bg-white transition duration-300">
                  <div className="bg-primary-600 text-white p-2 rounded-xl shadow-lg">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-lg font-bold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-600 via-primary-700 to-green-700 rounded-[3rem] p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-400/20 rounded-full -mr-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-4xl font-black mb-12 relative z-10 tracking-tight">Our Global Impact 📈</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { label: 'Registered Donors', value: '500+', icon: '🏢' },
              { label: 'Meals Delivered', value: '10k+', icon: '🍱' },
              { label: 'Partner NGOs', value: '50+', icon: '🤝' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-10 rounded-[2rem] border border-white/20 hover:scale-105 transition duration-300">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-5xl font-black mb-2">{stat.value}</p>
                <p className="text-primary-100 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
