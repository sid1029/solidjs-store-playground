import { createMemo } from 'solid-js';

import {
	Alert,
	Badge,
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
	accountId: string;
}

export default function AccountRow(props: AccountRowProps) {
	const { accounts, setAccount, deleteAccountAt, addDetailTo } =
		useCompanyContext();

	// Create derived signals that react to any change in props.
	const currAccount = createMemo(() => accounts[props.accountId].account);

	const _onEdit = (e: InputEvent, property: keyof Account) => {
		const val = (e.target as HTMLInputElement).value;
		setAccount(props.accountId, 'account', property, val);
	};

	return (
		<Col class='d-flex pt-2 flex-column gap-3'>
			<Badge class='font-monospace' bg='secondary'>
				{currAccount().id}
			</Badge>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<FormGroup as={Col} controlId='name'>
					<Form.Control
						value={currAccount().firstName}
						onInput={(evt) => _onEdit(evt, 'firstName')}
						type='text'
						placeholder='Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='schemaName'>
					<Form.Control
						value={currAccount().lastName}
						onInput={(evt) => _onEdit(evt, 'lastName')}
						type='text'
						placeholder='Schema Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='type'>
					<Form.Control
						value={currAccount().title}
						onInput={(evt) => _onEdit(evt, 'title')}
						type='text'
						placeholder='Type'
					/>
				</FormGroup>
				<div class='vr' />
				<Button
					variant='danger'
					onClick={() => deleteAccountAt(props.accountId)}
				>
					<i class='bi-trash' />
				</Button>
			</Stack>
			<ButtonGroup>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.accountId, true)}
				>
					Add Income
				</Button>
				<Button
					variant='primary'
					onClick={() => addDetailTo(props.accountId, false)}
				>
					Add Cost
				</Button>
			</ButtonGroup>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<BalanceSheet
					accountId={props.accountId}
					isInput={true}
					details={currAccount().income}
				/>
				<BalanceSheet
					accountId={props.accountId}
					isInput={false}
					details={currAccount().spend}
				/>
			</Stack>
		</Col>
	);
}

interface BalanceSheetProps {
	accountId: string;
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
								removeAccountFrom(props.accountId, props.isInput, idx())
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
