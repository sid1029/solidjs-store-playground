import { MultiProvider } from '@solid-primitives/context';
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
		<MultiProvider
			values={[
				[CompanyContextProvider, new CompanyDirectoryContextModel()],
				[EmployeeContextProvider, new EmployeeDirectoryContextModel()],
			]}
		>
			<Root />
		</MultiProvider>
	);
}

export default App;
