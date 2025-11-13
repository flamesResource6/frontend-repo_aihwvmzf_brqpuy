import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

export default function Signup() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create your account</h1>
        <AuthForm mode="signup" onSuccess={() => navigate('/login')} />
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
