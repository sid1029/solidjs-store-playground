import { Alert, Badge, Button, Card, ListGroup, Nav } from 'solid-bootstrap';

import { Entries } from '@solid-primitives/keyed';

import AccountRow from '@/components/AccountRow';
import { useCompanyContext } from '@/models/CompanyDirContext';
import type { Component } from 'solid-js';
import { A, type RouteSectionProps } from '@solidjs/router';
import LabeledIcon from '@/components/LabeledIcon';

const AccountRoot: Component<RouteSectionProps<unknown>> = () => {
	const { accounts, addFakeAccount, accountCount, totalRevenue } =
		useCompanyContext();

	return (
		<>
			<Card border='primary' class='my-2 sticky-top'>
				<Card.Header>
					<LabeledIcon iconId='briefcase' label='Accounts' />
				</Card.Header>
				<Card.Body>
					<Card.Title>Accounts : {accountCount()}</Card.Title>
					<Card.Text>Total revenue : ${totalRevenue()}</Card.Text>
				</Card.Body>
			</Card>
			<Button
				class='my-2 mw-100'
				variant='outline-warning'
				onClick={addFakeAccount}
			>
				Add Account
				<i class='ps-2 bi-plus-circle-fill' />
			</Button>
			<ListGroup class='my-2' numbered={true}>
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
							{uiPerson().account.emoji} - {uiPerson().account.firstName}
							&nbsp;
							{uiPerson().account.lastName}&nbsp;
							{uiPerson().account.title}
							<Badge class='float-end font-monospace' bg='success'>
								<Nav.Link as={A} href={`/accounts/${accountId}`}>
									<LabeledIcon label={accountId} iconId='info-circle' />
								</Nav.Link>
							</Badge>
							<AccountRow accountId={accountId} />
						</ListGroup.Item>
					)}
				</Entries>
			</ListGroup>
		</>
	);
};

export default AccountRoot;
