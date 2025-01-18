import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom';
import ManageUsers from '../Admin/ManageUsers/ManageUsers';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../shared/LoadingSpinner';
const Statistics = () => {

  const [role, isLoading] = useRole();

  if(isLoading) return <LoadingSpinner/>

  if(role === 'student') return <Navigate to={'/dashboard/my-application'} />
  if(role === 'moderator') return <Navigate to={'/dashboard/my-inventory'} />

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      { role === 'admin' && <ManageUsers/>}
    </div>
  )
}

export default Statistics;
