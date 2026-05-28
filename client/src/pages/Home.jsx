import { Link } from 'react-router-dom'
import { Heart, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="flex flex-col gradient-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary-700 uppercase bg-primary-100 rounded-full shadow-sm">
                🌱 Join the Food Revolution
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-8">
                Save Food, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">
                  Help People 🤝
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium italic">
                "Cutting food waste is a delicious way of saving money, helping to feed the world and protect the planet." 🌍
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/register?role=donor" className="btn-primary text-center flex items-center justify-center gap-3 px-10 py-5 text-lg">
                  Donate Food 🥗 <ArrowRight className="h-6 w-6" />
                </Link>
                <Link to="/donations" className="btn-secondary text-center px-10 py-5 text-lg">
                  Request Food 🥯
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Food Donation" 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
              {/* Floating Stat Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 glass-morphism p-8 rounded-[2rem] hidden md:block z-20"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-primary-600 p-4 rounded-2xl text-white shadow-lg shadow-primary-200">
                    <Heart className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Donated</p>
                    <p className="text-3xl font-black text-gray-900">5,000+ Meals</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">How It Works ✨</h2>
            <div className="h-2 w-24 bg-primary-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              We've simplified the bridge between abundance and necessity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Donors Donate 🍱', desc: 'Restaurants & hotels list surplus with ease.', icon: Heart, color: 'primary', border: 'primary' },
              { title: 'Receivers Request 🙋‍♂️', desc: 'NGOs find & request local food instantly.', icon: Users, color: 'orange', border: 'orange' },
              { title: 'Food Delivered 🚚', desc: 'Safe delivery to those who need it most.', icon: ShieldCheck, color: 'blue', border: 'blue' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="card group p-10"
              >
                <div className={`bg-${feature.color}-50 p-6 rounded-3xl w-fit mb-8 group-hover:bg-${feature.color}-600 transition-all duration-500 shadow-sm`}>
                  <feature.icon className={`h-10 w-10 text-${feature.color}-600 group-hover:text-white transition-colors`} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gray-50 italic text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-4xl text-primary-400 mb-6 font-serif">"</div>
          <p className="text-2xl text-gray-700 leading-relaxed mb-6">
            If you can't feed a hundred people, then feed just one.
          </p>
          <div className="font-bold text-gray-900">— Mother Teresa ✨</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community today and help us reduce food waste while helping those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
              Join Now
            </Link>
            <Link to="/about" className="bg-primary-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-800 transition duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
