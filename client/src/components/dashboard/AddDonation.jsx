import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Package, MapPin, Phone, Calendar, Info, User } from 'lucide-react'

const AddDonation = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    foodType: 'veg',
    expiryDate: '',
    pickupAddress: '',
    contactNumber: '',
    donorName: JSON.parse(localStorage.getItem('user'))?.name || '',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })
      if (image) {
        data.append('image', image)
      }

      await axios.post('/api/donations', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Donation added successfully!')
      navigate('/dashboard/my-donations')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add donation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">List New Food Donation</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Package className="h-4 w-4" /> Food Title
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. Fresh Vegetable Biryani"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Info className="h-4 w-4" /> Food Type
            </label>
            <select
              name="foodType"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.foodType}
              onChange={handleChange}
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Info className="h-4 w-4" /> Quantity
            </label>
            <input
              name="quantity"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. 10 portions"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Expiry Date
            </label>
            <input
              name="expiryDate"
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.expiryDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <User className="h-4 w-4" /> Donor Name
            </label>
            <input
              name="donorName"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.donorName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Phone className="h-4 w-4" /> Contact Number
            </label>
            <input
              name="contactNumber"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Package className="h-4 w-4" /> Food Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Pickup Address
          </label>
          <input
            name="pickupAddress"
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Full address for pickup"
            value={formData.pickupAddress}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Info className="h-4 w-4" /> Description
          </label>
          <textarea
            name="description"
            rows="4"
            required
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Additional details about the food..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Post Donation'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddDonation
