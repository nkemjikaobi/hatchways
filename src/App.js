import StudentState from '../src/context/students/StudentState';
import Home from '../src/components/screens/Home';
import './App.css';
import { ToastProvider } from 'react-toast-notifications';
import TopTal from './components/Toptal';
import Pricing from './components/Mui';

const App = () => {
	return (
		<StudentState>
			<ToastProvider>
				<div>
					{/* <Home /> */}
					{/* <TopTal /> */}
					<Pricing />
				</div>
			</ToastProvider>
		</StudentState>
	);
};

export default App;
