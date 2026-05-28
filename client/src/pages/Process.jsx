import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Truck, Heart, UserPlus, Search, HeartHandshake } from 'lucide-react'

const Process = () => {
  const steps = [
    {
      title: 'Join the Movement 🤝',
      description: 'Create your account as a Donor or Receiver. It only takes a minute to start making an impact.',
      icon: UserPlus,
      color: 'blue',
    },
    {
      title: 'List or Browse 🍎',
      description: 'Donors list surplus food with details and photos. Receivers browse available food in their local area.',
      icon: Search,
      color: 'green',
    },
    {
      title: 'Make a Connection 📞',
      description: 'Receivers send a request for food. Donors review and approve requests based on availability.',
      icon: HeartHandshake,
      color: 'orange',
    },
    {
      title: 'Safe Pickup 🚚',
      description: 'Once approved, coordinate a safe pickup time and location through our secure contact sharing.',
      icon: Truck,
      color: 'purple',
    },
    {
      title: 'Fill a Plate ❤️',
      description: 'Food is delivered to those in need, reducing waste and spreading kindness in our community.',
      icon: Heart,
      color: 'red',
    },
    {
      title: 'Mark Complete ✅',
      description: 'Donors mark the transaction as complete to help us track the collective impact of our community.',
      icon: CheckCircle,
      color: 'primary',
    },
  ]

  return (
    <div className="gradient-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 mb-8 text-sm font-black tracking-widest text-primary-700 uppercase bg-white shadow-xl shadow-primary-100 rounded-full"
          >
            🚀 Our Simple Workflow
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-10 tracking-tight"
          >
            The Journey of a Meal 🍱
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto italic font-medium leading-relaxed"
          >
            "Waste not, want not. See how we turn surplus into smiles through our seamless process." ✨
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Animated Progress Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gray-200/50 rounded-full hidden md:block">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 2 }}
                className="w-full bg-gradient-to-b from-primary-400 to-green-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]"
              ></motion.div>
            </div>

            <div className="space-y-32 relative">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col md:flex-row items-center gap-12 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 w-full">
                      <div className={`card p-10 hover:border-${step.color}-500 group transition-all duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`inline-flex items-center justify-center bg-${step.color}-50 p-6 rounded-3xl mb-8 group-hover:bg-${step.color}-600 transition-all duration-500 shadow-sm`}>
                          <Icon className={`h-12 w-12 text-${step.color}-600 group-hover:text-white transition-colors`} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-6">{step.title}</h3>
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 shrink-0">
                      <div className={`bg-${step.color}-600 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,0,0,0.2)] ring-8 ring-white transform hover:scale-110 transition duration-300`}>
                        <span className="text-2xl font-black">{index + 1}</span>
                      </div>
                    </div>

                    <div className="flex-1 hidden md:block"></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="glass-morphism p-20 rounded-[4rem] border-2 border-dashed border-primary-300"
          >
            <p className="text-4xl text-primary-900 font-black italic mb-10 leading-tight">
              "Sustainability is about making sure that we don't use up all the resources today, leaving none for tomorrow." 🌍
            </p>
            <div className="h-2 w-32 bg-primary-600 mx-auto rounded-full shadow-lg shadow-primary-200"></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Process
