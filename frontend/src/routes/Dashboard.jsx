import React,{useContext,useEffect} from 'react'
import Dash_head from '../utils/Dash_head'
import DataContext from '../context/DataContext';

const Dashboard = () => {
  const { errMessage, setErrMessage } = useContext(DataContext);
  useEffect(() => {
        setErrMessage({ message: "", show: false });
      }, []);
  return (
    <main className='container middle'>
      <Dash_head />
    </main>
  )
}

export default Dashboard
