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

import type { AccountDetails, Account } from '@/models/Company';
import { useCompanyContext } from '@/models/CompanyDirContext';
import { Key } from '@solid-primitives/keyed';

interface AccountRowProps {
	personIdx: number;
}

export default function AccountRow(props: AccountRowProps) {
	const {
		accounts,
		setAccount,
		deleteAccountAt,
		addAccountTo: addDetailTo,
	} = useCompanyContext();

	const _onEdit = (e: InputEvent, property: keyof Account) => {
		const val = (e.target as HTMLInputElement).value;
		setAccount(props.personIdx, 'account', property, val);
	};

	// Create derived signals that react to any change in props.
	const currPerson = createMemo(() => accounts[props.personIdx].account);

	return (
		<Col class='d-flex pt-2 flex-column gap-3'>
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
					onClick={() => deleteAccountAt(props.personIdx)}
				>
					<i class='bi-trash' />
				</Button>
			</Stack>
			<ButtonGroup>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.personIdx, true)}
				>
					Add Income
				</Button>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.personIdx, false)}
				>
					Add Cost
				</Button>
			</ButtonGroup>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<BalanceSheet
					accountIdx={props.personIdx}
					isInput={true}
					details={currPerson().income}
				/>
				<BalanceSheet
					accountIdx={props.personIdx}
					isInput={false}
					details={currPerson().spend}
				/>
			</Stack>
		</Col>
	);
}

interface BalanceSheetProps {
	accountIdx: number;
	isInput: boolean;
	details: AccountDetails;
}

function BalanceSheet(props: BalanceSheetProps) {
	const { removeAccountFrom } = useCompanyContext();

	return (
		<ListGroup style={{ 'max-width': '49%', flex: '0.5 1' }}>
			<Key
				each={props.details}
				by='name'
				fallback={
					<Alert variant='primary' class='text-center'>
						<i class='bi-exclamation-triangle-fill pe-2' />
						Add {props.isInput ? 'Income' : 'Spend'}
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
								removeAccountFrom(props.accountIdx, props.isInput, idx())
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
