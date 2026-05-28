import { useState, useEffect } from 'react'
import axios from 'axios'
import { Package, Heart, Clock, CheckCircle } from 'lucide-react'

const DonorDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    delivered: 0,
    requests: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const [donationsRes, requestsRes] = await Promise.all([
          axios.get('/api/donations/my-donations', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/requests/received', { headers: { Authorization: `Bearer ${token}` } })
        ])

        const donations = donationsRes.data.data
        setStats({
          total: donations.length,
          available: donations.filter(d => d.status === 'available').length,
          delivered: donations.filter(d => d.status === 'delivered').length,
          requests: requestsRes.data.data.filter(r => r.status === 'pending').length
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { name: 'Total Donations', value: stats.total, icon: Package, color: 'bg-blue-500' },
    { name: 'Available', value: stats.available, icon: Heart, color: 'bg-green-500' },
    { name: 'Delivered', value: stats.delivered, icon: CheckCircle, color: 'bg-primary-600' },
    { name: 'Pending Requests', value: stats.requests, icon: Clock, color: 'bg-yellow-500' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-gray-500 text-sm mb-1">{card.name}</p>
            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default DonorDashboard
