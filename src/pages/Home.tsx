import { Card, Col, Nav } from 'solid-bootstrap';
import type { Component } from 'solid-js';
import { A, type RouteSectionProps } from '@solidjs/router';
import { useCompanyContext } from '@/models/CompanyDirContext';
import { useEmployeeContext } from '@/models/EmployeeContext';
import LabeledIcon from '@/components/LabeledIcon';

const Home: Component<RouteSectionProps<unknown>> = () => {
	const { equipmentCount, totalSpend, accountCount, totalRevenue } =
		useCompanyContext();
	const { employeeCount, totalSalary } = useEmployeeContext();

	return (
		<Col>
			<Card border='success' class='my-2'>
				<Card.Header class='fw-bold'>
					<Nav.Link as={A} href={'/accounts'}>
						<LabeledIcon iconId='briefcase' label='Accounts' />
					</Nav.Link>
				</Card.Header>
				<Card.Body>
					<Card.Title>Accounts : {accountCount()}</Card.Title>
					<Card.Text>Total revenue : ${totalRevenue()}</Card.Text>
				</Card.Body>
			</Card>

			<Card border='info' class='my-2'>
				<Card.Header class='fw-bold'>
					<Nav.Link as={A} href={'/equipment'}>
						<LabeledIcon iconId='tools' label='Equipment' />
					</Nav.Link>
				</Card.Header>
				<Card.Body>
					<Card.Title>Equip count : {equipmentCount()}</Card.Title>
					<Card.Text>Equip total spend : ${totalSpend()}</Card.Text>
				</Card.Body>
			</Card>

			<Card border='warning' class='my-2'>
				<Card.Header class='fw-bold'>
					<Nav.Link as={A} href={'/employees'}>
						<LabeledIcon iconId='people' label='Employees' />
					</Nav.Link>
				</Card.Header>
				<Card.Body>
					<Card.Title>Employees : {employeeCount()}</Card.Title>
					<Card.Text>Total Salary : ${totalSalary()}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Home;
