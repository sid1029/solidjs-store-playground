import './App.scss';
import {
	CompanyContextProvider,
	CompanyDirectoryContextModel,
} from './models/CompanyDirContext';
import Root from './pages/Root';

function App() {
	return (
		<CompanyContextProvider model={new CompanyDirectoryContextModel()}>
			<Root />
		</CompanyContextProvider>
	);
}

export default App;
