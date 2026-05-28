import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Trash2, User, Mail, Shield } from 'lucide-react'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data.data)
    } catch (err) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('User deleted')
      fetchUsers()
    } catch (err) {
      toast.error('Failed to delete user')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2 rounded-full text-primary-600">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 w-fit ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'donor' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    <Shield className="h-3 w-3" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-gray-400 hover:text-red-600 transition duration-150"
                    disabled={user.role === 'admin'}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !loading && (
          <div className="p-12 text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  )
}

export default ManageUsers
