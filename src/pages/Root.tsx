import {
	Alert,
	Badge,
	Button,
	ButtonGroup,
	Card,
	Col,
	Container,
	ListGroup,
	Row,
} from 'solid-bootstrap';

import { Entries } from '@solid-primitives/keyed';

import EquipmentRow from '@/components/EquipmentRow';
import AccountRow from '@/components/AccountRow';
import { useCompanyContext } from '@/models/CompanyDirContext';
import { useEmployeeContext } from '@/models/EmployeeContext';
import EmployeeRow from '@/components/EmployeeRow';

export default function Root() {
	const {
		accounts,
		equipment,
		addFakeAccount,
		addFakeEquipment,
		accountCount,
		equipmentCount,
		totalRevenue,
		totalSpend,
	} = useCompanyContext();

	const { employees, employeeCount, addFakeEmployee, totalSalary } =
		useEmployeeContext();

	return (
		<Container class='px-0'>
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
				<Card border='primary' class='my-2'>
					<Card.Header>Employees</Card.Header>
					<Card.Body>
						<Card.Title>Employees : {employeeCount()}</Card.Title>
						<Card.Text>Total Salary : ${totalSalary()}</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row class='my-2'>
				<ListGroup numbered={true}>
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
									{empUi().employee.firstName} {empUi().employee.lastName} -{' '}
									{empUi().employee.title}
								</span>
								<Badge class='float-end font-monospace' bg='secondary'>
									{empId}
								</Badge>
								<EmployeeRow empId={empId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
			</Row>
			<hr />
			<Row class='my-3 sticky-top'>
				<Col class='ps-0'>
					<Card border='primary' class='my-2'>
						<Card.Header>Accounts</Card.Header>
						<Card.Body>
							<Card.Title>Accounts : {accountCount()}</Card.Title>
							<Card.Text>Total revenue : ${totalRevenue()}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col class='ps-0'>
					<Card border='primary' class='my-2'>
						<Card.Header>Equipment</Card.Header>
						<Card.Body>
							<Card.Title>Equip count : {equipmentCount()}</Card.Title>
							<Card.Text>Equip total spend : ${totalSpend()}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row class='my-2'>
				<ButtonGroup class='px-0'>
					<Button
						class='mw-100'
						variant='outline-warning'
						onClick={addFakeAccount}
					>
						Add Account
						<i class='ps-2 bi-plus-circle-fill' />
					</Button>
					<Button
						class='mw-100'
						variant='outline-warning'
						onClick={addFakeEquipment}
					>
						<i class='pe-2 bi-plus-circle-fill' />
						Add Equipment
					</Button>
				</ButtonGroup>
			</Row>
			<Row class='my-3' xs={2}>
				<ListGroup numbered={true}>
					<Entries
						of={accounts}
						fallback={
							<Alert variant='warning' class='text-center'>
								<i class='bi-exclamation-triangle-fill pe-2' />
								Add Accounts !
							</Alert>
						}
					>
						{(accountId, uiPerson) => (
							<ListGroup.Item itemId={uiPerson().account.id}>
								{uiPerson().account.firstName}&nbsp;
								{uiPerson().account.lastName}&nbsp;
								{uiPerson().account.title}
								<AccountRow accountId={accountId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
				<ListGroup numbered={true}>
					<Entries
						of={equipment}
						fallback={
							<Alert variant='warning' class='text-center'>
								<i class='bi-exclamation-triangle-fill pe-2' />
								Add Equipment !
							</Alert>
						}
					>
						{(equipmentId, uiEquip) => (
							<ListGroup.Item itemId={uiEquip().id}>
								{uiEquip().manufacturer} - {uiEquip().name}
								<EquipmentRow equipId={equipmentId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
			</Row>
		</Container>
	);
}
