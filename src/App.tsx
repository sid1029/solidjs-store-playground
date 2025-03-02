import { MultiProvider } from '@solid-primitives/context';
import './App.scss';
import LabeledIcon from '@/components/LabeledIcon';
import {
	CompanyContextProvider,
	CompanyDirectoryContextModel,
} from '@/models/CompanyDirContext';
import {
	EmployeeContextProvider,
	EmployeeDirectoryContextModel,
} from '@/models/EmployeeContext';
import type { RouteSectionProps } from '@solidjs/router';
import { Container, Nav, Navbar } from 'solid-bootstrap';
import type { Component } from 'solid-js';

const App: Component<RouteSectionProps<unknown>> = (
	props: RouteSectionProps<unknown>,
) => {
	return (
		<MultiProvider
			values={[
				[CompanyContextProvider, new CompanyDirectoryContextModel()],
				[EmployeeContextProvider, new EmployeeDirectoryContextModel()],
			]}
		>
			<Navbar class='nav-underline' collapseOnSelect expand='lg'>
				<Container>
					<Navbar.Brand href='/home'>
						<LabeledIcon iconId='buildings' label='Lumon' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav class='ms-auto'>
							<Nav.Link href='/accounts'>Accounts</Nav.Link>
							<Nav.Link href='/equipment'>Equipment</Nav.Link>
							<Nav.Link href='/employees'>Employees</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container class='px-0'>{props.children}</Container>
		</MultiProvider>
	);
};

export default App;
