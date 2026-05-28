import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, MessageSquare, Star, Send, ExternalLink } from 'lucide-react'
import { toast } from 'react-toastify'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  })

  const videos = [
    {
      id: 'QvkDDA62-tw', // Updated video: Do Not Waste Food
      url: 'https://youtu.be/QvkDDA62-tw?si=pIf0TWHaNFqt6y5a',
      title: 'Stop Wasting Food 🛑',
      description: 'Learn why food waste is one of the biggest challenges of our time and how you can help.'
    },
    {
      id: 'TVP3j7_W7og', // Updated video: Food Waste, Global Hunger & You
      url: 'https://youtu.be/TVP3j7_W7og?si=K1WSDCiUBjsQWzNA',
      title: 'Community Impact 🤝',
      description: 'Witness how small acts of food donation can transform entire neighborhoods.'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Thank you for your valuable feedback! 🌟')
    setFormData({ name: '', email: '', rating: 5, message: '' })
  }

  return (
    <div className="bg-indigo-950 min-h-screen text-white pb-20">
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-indigo-900 to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            YOUR VOICE <span className="text-yellow-400 underline">MATTERS</span> 🗣️
          </motion.h1>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-medium">
            "We all need people who will give us feedback. That's how we improve." — Bill Gates 🚀
          </p>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Videos Section */}
        <div className="space-y-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg">
              <Video className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Watch & Learn 📺</h2>
          </div>

          {videos.map((video, index) => (
            <motion.div 
              key={video.id}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-indigo-900/50 p-6 rounded-3xl border border-white/10 hover:border-yellow-400/50 transition-all group"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                  {video.title} <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </a>
              <p className="text-indigo-200 leading-relaxed">{video.description}</p>
            </motion.div>
          ))}

          <div className="bg-yellow-400 p-8 rounded-3xl text-indigo-950 shadow-xl">
            <h4 className="text-xl font-black mb-2 uppercase tracking-wider">Fun Fact 💡</h4>
            <p className="font-bold">Approximately 1/3 of all food produced in the world is wasted. Let's change that together! 🌍</p>
          </div>
        </div>

        {/* Feedback Form Section */}
        <div className="relative">
          <div className="sticky top-24 bg-white rounded-[2.5rem] p-10 text-gray-900 shadow-2xl overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 right-0 bg-yellow-400 w-32 h-32 rounded-bl-full -mr-10 -mt-10"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Send Feedback ✍️</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-indigo-600 focus:outline-none transition-all font-bold"
                  placeholder="Your Name 👤"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-indigo-600 focus:outline-none transition-all font-bold"
                  placeholder="email@example.com ✉️"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500">Experience Rating</label>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, rating: num})}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        formData.rating >= num ? 'bg-yellow-400 text-indigo-950 scale-110 shadow-lg shadow-yellow-200' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Star className={`h-6 w-6 ${formData.rating >= num ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-gray-500">Your Message</label>
                <textarea 
                  rows="4" 
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-indigo-600 focus:outline-none transition-all font-bold"
                  placeholder="How can we improve? 💭"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                SUBMIT FEEDBACK <Send className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm font-bold">We read every single piece of feedback. ❤️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
