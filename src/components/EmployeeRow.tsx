import { createMemo } from 'solid-js';

import { Button, Col, Form, FormGroup, Stack } from 'solid-bootstrap';

import type { Employee } from '@/models/Employee';
import { useEmployeeContext } from '@/models/EmployeeContext';

interface EmployeeRowProps {
	empId: string;
}

export default function EmployeeRow(props: EmployeeRowProps) {
	const { employees, setEmployees, deleteEmployee } = useEmployeeContext();

	const _editProp = (e: InputEvent, property: keyof Employee) => {
		const inputElem = e.target as HTMLInputElement;
		const value = inputElem.value;
		if (inputElem.type === 'number') {
			let num = Number.parseFloat(inputElem.value);
			if (Number.isNaN(num)) {
				num = 0;
			}
			setEmployees(props.empId, 'employee', property, num);
		} else {
			setEmployees(props.empId, 'employee', property, value);
		}
	};

	const currEmp = createMemo(() => employees[props.empId].employee);

	return (
		<Col class='d-flex pt-2 flex-column gap-3'>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<FormGroup as={Col} controlId='firstName'>
					<Form.Control
						value={currEmp().firstName}
						onInput={(evt) => _editProp(evt, 'firstName')}
						type='text'
						placeholder='First Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='lastName'>
					<Form.Control
						value={currEmp().lastName}
						onInput={(evt) => _editProp(evt, 'lastName')}
						type='text'
						placeholder='Last Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='salary'>
					<Form.Control
						value={currEmp().salary}
						onInput={(evt) => _editProp(evt, 'salary')}
						type='number'
						placeholder='Salary'
					/>
				</FormGroup>
				<div class='vr' />
				<Button variant='danger' onClick={() => deleteEmployee(props.empId)}>
					<i class='bi-trash' />
				</Button>
			</Stack>
		</Col>
	);
}
