import { createMemo } from 'solid-js';

import { Card, NavLink } from 'solid-bootstrap';
import ItemNav from '@/components/ItemNav';
import LabeledIcon from '@/components/LabeledIcon';

import { type Component, Show } from 'solid-js';
import { A, useParams, type RouteSectionProps } from '@solidjs/router';
import { useEmployeeContext } from '@/models/EmployeeContext';

const EmployeeDetailsView: Component<RouteSectionProps<unknown>> = () => {
	const { employees } = useEmployeeContext();
	const params = useParams();
	const currEmployee = createMemo(() => employees[params.id]);

	return (
		<Card border='secondary' class='my-2'>
			<Card.Header>
				<Card.Title class='d-flex align-items-baseline mb-0'>
					<NavLink
						as={A}
						type='button'
						class='me-2 p-2 btn btn-outline-success'
						href='/employees'
					>
						<LabeledIcon iconId='arrow-left-circle' label='Back' />
					</NavLink>
					<Show when={currEmployee()}>
						<span>
							{currEmployee().employee.emoji} -{' '}
							{currEmployee().employee.firstName}{' '}
							{currEmployee().employee.lastName}
						</span>
					</Show>
					<ItemNav
						class='ms-auto'
						data={employees}
						id={params.id}
						itemType='employees'
					/>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<pre>{JSON.stringify(currEmployee(), null, 2)}</pre>
			</Card.Body>
		</Card>
	);
};

export default EmployeeDetailsView;
