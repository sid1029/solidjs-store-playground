import { createMemo } from 'solid-js';

import {
	Alert,
	Button,
	ButtonGroup,
	Col,
	Form,
	FormGroup,
	ListGroup,
	Stack,
} from 'solid-bootstrap';

import type { PersonDetails, Person } from '@/models/Company';
import { useCompanyContext } from '@/models/CompanyDirContext';
import { Key } from '@solid-primitives/keyed';

interface PersonRowProps {
	personIdx: number;
}

export default function PersonRow(props: PersonRowProps) {
	const { people, setPeople, deletePersonAt, addDetailTo } =
		useCompanyContext();

	const _onEdit = (e: InputEvent, property: keyof Person) => {
		const val = (e.target as HTMLInputElement).value;
		setPeople(props.personIdx, 'person', property, val);
	};

	// Create derived signals that react to any change in props.
	const currPerson = createMemo(() => people[props.personIdx].person);

	return (
		<Col class='d-flex flex-column gap-3'>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<FormGroup as={Col} controlId='name'>
					<Form.Control
						value={currPerson().firstName}
						onInput={(evt) => _onEdit(evt, 'firstName')}
						type='text'
						placeholder='Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='schemaName'>
					<Form.Control
						value={currPerson().lastName}
						onInput={(evt) => _onEdit(evt, 'lastName')}
						type='text'
						placeholder='Schema Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='type'>
					<Form.Control
						value={currPerson().title}
						onInput={(evt) => _onEdit(evt, 'title')}
						type='text'
						placeholder='Type'
					/>
				</FormGroup>
				<div class='vr' />
				<Button
					variant='danger'
					onClick={() => deletePersonAt(props.personIdx)}
				>
					<i class='bi-trash' />
				</Button>
			</Stack>
			<ButtonGroup>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.personIdx, true)}
				>
					Input Detail +
				</Button>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.personIdx, false)}
				>
					+ Output Detail
				</Button>
			</ButtonGroup>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<ConnectorGroup
					personIdx={props.personIdx}
					isInput={true}
					details={currPerson().inputs}
				/>
				<ConnectorGroup
					personIdx={props.personIdx}
					isInput={false}
					details={currPerson().outputs}
				/>
			</Stack>
		</Col>
	);
}

interface ConnectorGroupProps {
	personIdx: number;
	isInput: boolean;
	details: PersonDetails;
	class?: string;
}

function ConnectorGroup(props: ConnectorGroupProps) {
	const { removeDetailFrom: removeConnectorFrom } = useCompanyContext();

	return (
		<ListGroup style={{ width: '48%', flex: 1 }} class={props.class}>
			<Key
				each={props.details}
				by='name'
				fallback={
					<Alert variant='primary' class='text-center'>
						<i class='bi-exclamation-triangle-fill pe-2' />
						Add {props.isInput ? 'Inputs' : 'Outputs'}
					</Alert>
				}
			>
				{(conn, idx) => (
					<ListGroup.Item
						itemId={conn().name}
						class='d-flex flex-row gap-3 align-items-baseline'
					>
						<h6 class='text-truncate me-auto'>
							<b>[{conn().revenue}]</b>-{conn().name} - {conn().label}
						</h6>
						<Button
							variant='danger'
							onClick={() =>
								removeConnectorFrom(props.personIdx, props.isInput, idx())
							}
						>
							<i class='bi-trash' />
						</Button>
					</ListGroup.Item>
				)}
			</Key>
		</ListGroup>
	);
}
