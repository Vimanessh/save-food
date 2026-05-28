import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Phone, MapPin, Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/requests/my-requests', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRequests(res.data.data)
    } catch (err) {
      toast.error('Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">My Food Requests</h2>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div key={request._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{request.donation?.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  request.status === 'approved' ? 'bg-green-100 text-green-700' :
                  request.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {request.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <span>{request.donation?.pickupAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-primary-500" />
                  <span>Requested on: {new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {request.status === 'approved' && (
                <div className="bg-primary-50 p-4 rounded-xl">
                  <p className="text-sm font-bold text-primary-700 mb-2">Donor Contact Info:</p>
                  <div className="flex items-center gap-2 text-sm text-primary-600 mb-1">
                    <Phone className="h-4 w-4" />
                    <span>{request.donor?.phone || 'Not provided'}</span>
                  </div>
                  <p className="text-xs text-primary-500">Please contact the donor to coordinate pickup.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 text-gray-500">
          You haven't made any requests yet. 
          <Link to="/donations" className="text-primary-600 font-bold ml-1">Browse food listings</Link>
        </div>
      )}
    </div>
  )
}

export default MyRequests
