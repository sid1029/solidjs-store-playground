import './App.scss';
import { CompanyContextProvider } from './models/CompanyDirContext';
import Root from './pages/Root';

function App() {
	return (
		<CompanyContextProvider>
			<Root />
		</CompanyContextProvider>
	);
}

export default App;
