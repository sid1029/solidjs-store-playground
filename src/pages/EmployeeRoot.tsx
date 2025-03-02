import {
	Alert,
	Badge,
	Button,
	Card,
	Container,
	ListGroup,
	Nav,
	Row,
} from 'solid-bootstrap';

import { Entries } from '@solid-primitives/keyed';

import { useEmployeeContext } from '@/models/EmployeeContext';
import EmployeeRow from '@/components/EmployeeRow';
import type { Component } from 'solid-js';
import { A, type RouteSectionProps } from '@solidjs/router';
import LabeledIcon from '@/components/LabeledIcon';

const EmployeeRoot: Component<RouteSectionProps<unknown>> = () => {
	const { employees, employeeCount, addFakeEmployee, totalSalary } =
		useEmployeeContext();

	return (
		<Container class='px-0'>
			<Row class='my-2'>
				<Card border='primary' class='my-2'>
					<Card.Header>Employees</Card.Header>
					<Card.Body>
						<Card.Title>Employees : {employeeCount()}</Card.Title>
						<Card.Text>Total Salary : ${totalSalary()}</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row class='my-2'>
				<Button
					class='mw-100'
					variant='outline-warning'
					onClick={addFakeEmployee}
				>
					<i class='pe-2 bi-plus-circle-fill' />
					Add Employee
				</Button>
			</Row>
			<Row class='my-2'>
				<ListGroup numbered={false}>
					<Entries
						of={employees}
						fallback={
							<Alert variant='warning' class='text-center'>
								<i class='bi-exclamation-triangle-fill pe-2' />
								Add Employees !
							</Alert>
						}
					>
						{(empId, empUi) => (
							<ListGroup.Item itemId={empId}>
								<span class='text-nowrap text-truncate fw-bold'>
									{empUi().employee.emoji} - {empUi().employee.firstName}{' '}
									{empUi().employee.lastName} - {empUi().employee.title}
								</span>
								<Badge class='float-end font-monospace' bg='primary'>
									<Nav.Link as={A} href={`/employees/${empId}`}>
										<LabeledIcon label={empId} iconId='info-circle' iconAfter />
									</Nav.Link>
								</Badge>
								<EmployeeRow empId={empId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
			</Row>
		</Container>
	);
};

export default EmployeeRoot;
