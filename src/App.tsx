import './App.scss';
import {
	CompanyContextProvider,
	CompanyDirectoryContextModel,
} from './models/CompanyDirContext';
import {
	EmployeeContextProvider,
	EmployeeDirectoryContextModel,
} from './models/EmployeeContext';
import Root from './pages/Root';

function App() {
	return (
		<CompanyContextProvider model={new CompanyDirectoryContextModel()}>
			<EmployeeContextProvider model={new EmployeeDirectoryContextModel()}>
				<Root />
			</EmployeeContextProvider>
		</CompanyContextProvider>
	);
}

export default App;
