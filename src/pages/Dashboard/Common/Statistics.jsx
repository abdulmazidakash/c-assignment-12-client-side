import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom';
import ManageUsers from '../Admin/ManageUsers/ManageUsers';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import AnalyticsChart from '../Admin/AnalyticsChart/AnalyticsChart';
const Statistics = () => {

  const [role, isLoading] = useRole();

  if(isLoading) return <LoadingSpinner/>

  if(role === 'student') return <Navigate to={'/dashboard/profile'} />
  if(role === 'moderator') return <Navigate to={'/dashboard/manage-scholarship'} />

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      { role === 'admin' && <AnalyticsChart/> }
    </div>
  )
}

export default Statistics;
