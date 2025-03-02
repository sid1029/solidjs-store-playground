/* @refresh reload */
import './index.scss';
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import Home from '@/pages/Home';
import AccountRoot from '@/pages/AccountRoot';
import EmployeeRoot from '@/pages/EmployeeRoot';
import EquipmentRoot from '@/pages/EquipmentRoot';

import App from '@/App';
import AccountDetailsView from '@/components/AccountDetailsView';
import EquipmentDetailsView from '@/components/EquipmentDetailsView';
import EmployeeDetailsView from '@/components/EmployeeDetailsView';

const root = document.getElementById('root');

render(
	() => (
		<Router root={App} base='/solidjs-store-playground'>
			<Route path='/accounts' component={AccountRoot} />
			<Route path='/accounts/:id' component={AccountDetailsView} />
			<Route path='/equipment' component={EquipmentRoot} />
			<Route path='/equipment/:id' component={EquipmentDetailsView} />
			<Route path='/employees' component={EmployeeRoot} />
			<Route path='/employees/:id' component={EmployeeDetailsView} />
			<Route path={['/*', '/home']} component={Home} />
		</Router>
	),
	// biome-ignore lint/style/noNonNullAssertion: getting root DOM element to obtain entrypoint.
	root!,
);
