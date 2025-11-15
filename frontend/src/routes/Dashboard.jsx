import React,{useContext,useEffect} from 'react'
import Dash_head from '../utils/Dash_head'
import DataContext from '../context/DataContext';
import DashBody from '../utils/DashBody';

const Dashboard = () => {
  const { errMessage, setErrMessage } = useContext(DataContext);
  useEffect(() => {
        setErrMessage({ message: "", show: false });
      }, []);
  return (
    <main className='container middle'>
      <Dash_head />
      <DashBody/>
    </main>
  )
}

export default Dashboard
