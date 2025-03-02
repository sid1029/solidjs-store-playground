import { Card, Col } from 'solid-bootstrap';
import type { Component } from 'solid-js';
import type { RouteSectionProps } from '@solidjs/router';
import { useCompanyContext } from '@/models/CompanyDirContext';
import { useEmployeeContext } from '@/models/EmployeeContext';

const Home: Component<RouteSectionProps<unknown>> = () => {
	const { equipmentCount, totalSpend, accountCount, totalRevenue } =
		useCompanyContext();
	const { employeeCount, totalSalary } = useEmployeeContext();

	return (
		<Col>
			<Card text='dark' bg='info' class='my-2'>
				<Card.Header class='fw-bold'>Equipment</Card.Header>
				<Card.Body>
					<Card.Title>Equip count : {equipmentCount()}</Card.Title>
					<Card.Text>Equip total spend : ${totalSpend()}</Card.Text>
				</Card.Body>
			</Card>

			<Card text='dark' bg='warning' class='my-2'>
				<Card.Header class='fw-bold'>Employees</Card.Header>
				<Card.Body>
					<Card.Title>Employees : {employeeCount()}</Card.Title>
					<Card.Text>Total Salary : ${totalSalary()}</Card.Text>
				</Card.Body>
			</Card>

			<Card text='dark' bg='secondary' class='my-2'>
				<Card.Header class='fw-bold'>Accounts</Card.Header>
				<Card.Body>
					<Card.Title>Accounts : {accountCount()}</Card.Title>
					<Card.Text>Total revenue : ${totalRevenue()}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

export default Home;
