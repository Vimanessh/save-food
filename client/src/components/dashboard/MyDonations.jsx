import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Trash2, Edit, Eye, CheckCircle, XCircle } from 'lucide-react'

const MyDonations = ({ isAdmin = false }) => {
  const [donations, setDonations] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const config = { headers: { Authorization: `Bearer ${token}` } }
      
      const endpoint = isAdmin ? '/api/donations?all=true' : '/api/donations/my-donations'
      const res = await axios.get(endpoint, config)
      setDonations(res.data.data)

      if (!isAdmin) {
        const reqRes = await axios.get('/api/requests/received', config)
        setRequests(reqRes.data.data)
      }
    } catch (err) {
      toast.error('Failed to fetch donations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [isAdmin])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return
    try {
      await axios.delete(`/api/donations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      toast.success('Donation deleted')
      fetchData()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  const handleRequestStatus = async (requestId, status) => {
    try {
      await axios.put(`/api/requests/${requestId}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      toast.success(`Request ${status}`)
      fetchData()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{isAdmin ? 'All Donations' : 'My Donations'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Food</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {donations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{donation.title}</div>
                    <div className="text-xs text-gray-500">{new Date(donation.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{donation.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                      donation.status === 'available' ? 'bg-green-100 text-green-700' :
                      donation.status === 'requested' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-primary-600"><Eye className="h-5 w-5" /></button>
                      <button className="text-gray-400 hover:text-blue-600"><Edit className="h-5 w-5" /></button>
                      <button 
                        onClick={() => handleDelete(donation._id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {donations.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">No donations found.</div>
          )}
        </div>
      </div>

      {!isAdmin && requests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Received Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">Food</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{request.receiver?.name}</div>
                      <div className="text-xs text-gray-500">{request.receiver?.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{request.donation?.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        request.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleRequestStatus(request._id, 'approved')}
                            className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-bold"
                          >
                            <CheckCircle className="h-4 w-4" /> Approve
                          </button>
                          <button 
                            onClick={() => handleRequestStatus(request._id, 'rejected')}
                            className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-bold"
                          >
                            <XCircle className="h-4 w-4" /> Reject
                          </button>
                        </div>
                      )}
                      {request.status === 'approved' && (
                        <button 
                          onClick={() => handleRequestStatus(request._id, 'completed')}
                          className="btn-primary py-1 px-3 text-xs"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyDonations
