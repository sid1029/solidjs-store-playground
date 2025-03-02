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

import AccountRow from '@/components/AccountRow';
import { useCompanyContext } from '@/models/CompanyDirContext';
import type { Component } from 'solid-js';
import type { RouteSectionProps } from '@solidjs/router';
import LabeledIcon from '@/components/LabeledIcon';

const AccountRoot: Component<RouteSectionProps<unknown>> = () => {
	const { accounts, addFakeAccount, accountCount, totalRevenue } =
		useCompanyContext();

	return (
		<Container class='px-0'>
			<Row class='my-3 sticky-top'>
				<Card border='primary' class='my-2'>
					<Card.Header>Accounts</Card.Header>
					<Card.Body>
						<Card.Title>Accounts : {accountCount()}</Card.Title>
						<Card.Text>Total revenue : ${totalRevenue()}</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row class='my-2'>
				<Button
					class='mw-100'
					variant='outline-warning'
					onClick={addFakeAccount}
				>
					Add Account
					<i class='ps-2 bi-plus-circle-fill' />
				</Button>
			</Row>
			<Row class='my-3'>
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
								{uiPerson().account.emoji} - {uiPerson().account.firstName}
								&nbsp;
								{uiPerson().account.lastName}&nbsp;
								{uiPerson().account.title}
								<Badge class='float-end font-monospace' bg='primary'>
									<Nav.Link href={`/accounts/${accountId}`}>
										<LabeledIcon
											label={accountId}
											iconId='info-circle'
											iconAfter
										/>
									</Nav.Link>
								</Badge>
								<AccountRow accountId={accountId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
			</Row>
		</Container>
	);
};

export default AccountRoot;
