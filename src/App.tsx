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
import { A, type RouteSectionProps } from '@solidjs/router';
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
					<Navbar.Brand as={A} href='/home'>
						<LabeledIcon iconId='buildings' label='Lumon' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav class='ms-auto'>
							<Nav.Link as={A} href='/accounts'>
								<LabeledIcon iconId='briefcase' label='Accounts' />
							</Nav.Link>
							<Nav.Link as={A} href='/equipment'>
								<LabeledIcon iconId='tools' label='Equipment' />
							</Nav.Link>
							<Nav.Link as={A} href='/employees'>
								<LabeledIcon iconId='people' label='Employees' />
							</Nav.Link>
							<Nav.Link href='https://github.com/sid1029/solidjs-store-playground'>
								<LabeledIcon
									iconId='github'
									label={
										<span>
											Github <i class='bi bi-box-arrow-up-right ps-1' />
										</span>
									}
								/>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container class='px-0'>{props.children}</Container>
		</MultiProvider>
	);
};

export default App;
