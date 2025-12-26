import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '', password: '', firstName: '', phone: '', age: '', gender: '', address: ''
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({ doctorEmail: '', date: '', time: '', reason: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const doctors = [
    { name: "Dr. Sumathi", email: "dr.sumathi@test.com", specialty: "Cardiologist", experience: 10, days: "Mon, Wed, Fri" },
    { name: "Dr. Ramesh", email: "dr.ramesh@test.com", specialty: "Neurologist", experience: 8, days: "Tue, Thu, Sat" },
    { name: "Dr. Neha", email: "dr.neha@test.com", specialty: "Pediatrician", experience: 5, days: "Mon, Wed, Fri" },
    { name: "Dr. Gaana", email: "dr.gaana@test.com", specialty: "Dermatologist", experience: 7, days: "Mon, Wed, Fri" },
    { name: "Dr. Vinaya", email: "dr.vinaya@test.com", specialty: "Orthopedic", experience: 6, days: "Tue, Thu, Sat" },
    { name: "Dr. Hithesh", email: "dr.hithesh@test.com", specialty: "Oncologist", experience: 9, days: "Mon, Wed, Fri" }
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setCurrentPage('dashboard');
        setMessage('Registration successful!');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Backend not running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setCurrentPage('dashboard');
        setMessage('Login successful!');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Backend not running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('user', { ...data.user, role: 'doctor' });
        setUser({ ...data.user, role: 'doctor' });
        setCurrentPage('dashboard');
        setMessage('Doctor login successful!');
      } else {
        setMessage(data.message || 'Doctor login failed');
      }
    } catch (error) {
      setMessage('Backend not running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentPage('home');
    setFormData({ email: '', password: '', firstName: '', phone: '', age: '', gender: '', address: '' });
    setLoginData({ email: '', password: '' });
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleBookingChange = (e) => setBookingData({ ...bookingData, [e.target.name]: e.target.value });

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingData({ doctorEmail: doctor.email, date: '', time: '', reason: '' });
    setShowBookingModal(true);
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    alert('Appointment booked successfully!');
    setShowBookingModal(false);
  };

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg p-6">
          <h1 className="text-4xl font-bold text-indigo-600 text-center">Hospital Management System</h1>
        </nav>
        <div className="container mx-auto p-12 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 text-gray-800">Welcome to HMS</h2>
              <p className="text-2xl text-gray-600 mb-12">Complete hospital management solution</p>
              <div className="space-y-4">
                <button onClick={() => setCurrentPage('register')} 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl text-xl font-bold hover:from-indigo-700 shadow-2xl">
                  New Patient Registration
                </button>
                <button onClick={() => setCurrentPage('patientLogin')} 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl text-xl font-bold hover:from-blue-700 shadow-2xl">
                  Patient Login
                </button>
                <button onClick={() => setCurrentPage('doctorLogin')} 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl text-xl font-bold hover:from-green-700 shadow-2xl">
                  Doctor Login
                </button>
              </div>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-2xl">
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register Page
  if (currentPage === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg p-6">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-3xl font-bold text-indigo-600">Hospital Management</h1>
            <button onClick={() => setCurrentPage('home')} className="text-indigo-600 font-semibold hover:underline">Back to Home</button>
          </div>
        </nav>
        <div className="container mx-auto p-8 max-w-6xl">
          <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">New Patient Registration</h2>
            {message && (
              <div className={`p-6 rounded-xl mb-8 text-lg font-semibold ${
                message.includes('successful') ? 'bg-green-100 text-green-800 border-4 border-green-400' : 
                'bg-red-100 text-red-800 border-4 border-red-400'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <input name="firstName" placeholder="Full Name" value={formData.firstName} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <input name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <input name="age" type="number" min="1" max="120" placeholder="Age" value={formData.age} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <select name="gender" value={formData.gender} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <textarea name="address" placeholder="Address" value={formData.address} onChange={handleFormChange} className="p-4 border border-gray-300 rounded-xl font-medium md:col-span-2 lg:col-span-1 h-20 resize-none focus:ring-4 focus:ring-blue-500 focus:border-transparent" required />
              <div className="md:col-span-2 lg:col-span-3">
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 shadow-2xl disabled:opacity-50 transition-all">
                  {loading ? 'Registering...' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Patient Login Page
  if (currentPage === 'patientLogin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg p-6">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-3xl font-bold text-indigo-600">Hospital Management</h1>
            <button onClick={() => setCurrentPage('home')} className="text-indigo-600 font-semibold hover:underline">Back to Home</button>
          </div>
        </nav>
        <div className="container mx-auto p-8 max-w-md">
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Patient Login</h2>
            {message && (
              <div className={`p-6 rounded-xl mb-8 text-lg font-semibold ${
                message.includes('successful') ? 'bg-green-100 text-green-800 border-4 border-green-400' : 
                'bg-red-100 text-red-800 border-4 border-red-400'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handlePatientLogin} className="space-y-6">
              <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent font-medium" required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-cyan-700 shadow-2xl disabled:opacity-50 transition-all">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => setCurrentPage('register')} className="text-indigo-600 hover:underline font-semibold">
                New Patient? Register here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Doctor Login Page
  if (currentPage === 'doctorLogin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg p-6">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-3xl font-bold text-indigo-600">Hospital Management</h1>
            <button onClick={() => setCurrentPage('home')} className="text-indigo-600 font-semibold hover:underline">Back to Home</button>
          </div>
        </nav>
        <div className="container mx-auto p-8 max-w-md">
          <div className="bg-white p-10 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Doctor Login</h2>
            {message && (
              <div className={`p-6 rounded-xl mb-8 text-lg font-semibold ${
                message.includes('successful') ? 'bg-green-100 text-green-800 border-4 border-green-400' : 
                'bg-red-100 text-red-800 border-4 border-red-400'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleDoctorLogin} className="space-y-6">
              <input name="email" type="email" placeholder="Doctor Email" value={loginData.email} onChange={handleLoginChange} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent font-medium" required />
              <input name="password" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent font-medium" required />
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 shadow-2xl disabled:opacity-50 transition-all">
                {loading ? 'Logging in...' : 'Doctor Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600">Hospital Management</h1>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-800 text-xl">
              Welcome, {user?.firstName || user?.email?.split('@')[0]}
            </span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 font-semibold transition-all">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8 max-w-6xl">
        <div className="bg-white p-10 rounded-2xl shadow-2xl mb-12">
          <h2 className="text-5xl font-bold mb-6 text-gray-800">Dashboard</h2>
          <p className="text-2xl text-gray-600">Choose a specialist doctor for appointment</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="text-4xl mb-6">👨‍⚕️</div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">{doctor.name}</h3>
              <div className="space-y-3 mb-8">
                <p className="text-xl"><span className="font-bold text-gray-800">Specialty:</span> {doctor.specialty}</p>
                <p className="text-xl"><span className="font-bold text-gray-800">Experience:</span> {doctor.experience} years</p>
                <p className="text-xl"><span className="font-bold text-gray-800">Available:</span> <span className="text-green-600 font-bold">{doctor.days}</span></p>
              </div>
              <button onClick={() => openBookingModal(doctor)} 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-indigo-600">Book with {selectedDoctor?.name}</h3>
              <button onClick={() => setShowBookingModal(false)} className="text-3xl font-bold text-gray-500 hover:text-gray-700">×</button>
            </div>
            
            <form onSubmit={bookAppointment} className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-700">Doctor</label>
                <div className="p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                  <p className="font-bold text-xl text-indigo-800">{selectedDoctor?.name}</p>
                  <p className="text-indigo-600">{selectedDoctor?.specialty}</p>
                </div>
              </div>
              
              <input name="date" type="date" required 
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent font-medium" />
              
              <select name="time" required className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500 focus:border-transparent font-medium">
                <option value="">Select Time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00
  AM">11:00 AM</option>   
                <option value="02:00 PM">02:00 PM</option>      
                <option value="03:00 PM">03:00 PM</option>
              </select>
              
              <textarea name="reason" placeholder="Reason for Visit" required 
                className="w-full p-4 border border-gray-300 rounded-xl font-medium h-24 resize-none focus:ring-4 focus:ring-green-500 focus:border-transparent"></textarea>

              <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl font-bold text-xl hover:from-green-700 hover:to-emerald-700 shadow-2xl transition-all">
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;   