
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'midwife':
      return <DoctorDashboard />; // or <MidwifeDashboard /> if you create one
    case 'admin':
      return <AdminDashboard />;
    case 'user':
    default:
      return <UserDashboard />;
  }
};
export default Dashboard;