import StudentState from '../src/context/students/StudentState'
import Home from '../src/components/screens/Home'
import './App.css';
import { ToastProvider } from 'react-toast-notifications'

const App = () => {
  return (
    <StudentState>
      <ToastProvider>
        <div >
          <Home />
        </div>
      </ToastProvider>
    </StudentState>
    
  );
}

export default App;
