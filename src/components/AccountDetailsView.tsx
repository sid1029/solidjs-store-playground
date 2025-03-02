import { createMemo, Show } from 'solid-js';

import { Button, Card } from 'solid-bootstrap';

import { useCompanyContext } from '@/models/CompanyDirContext';
import type { Component } from 'solid-js';
import { useParams, type RouteSectionProps } from '@solidjs/router';
import ItemNav from './ItemNav';
import LabeledIcon from './LabeledIcon';

const AccountDetailsView: Component<RouteSectionProps<unknown>> = () => {
	const { accounts } = useCompanyContext();
	const params = useParams();
	const currAccount = createMemo(() => accounts[params.id]);

	return (
		<Card border='secondary' class='my-2'>
			<Card.Header>
				<Card.Title class='d-flex align-items-baseline mb-0'>
					<Button class='me-2' variant='warning' href='/accounts'>
						<LabeledIcon iconId='arrow-left-circle' label='Back' />
					</Button>
					<Show when={currAccount()}>
						<span>
							{currAccount().account.emoji} - {currAccount().account.firstName}{' '}
							{currAccount().account.lastName}
						</span>
					</Show>
					<ItemNav
						class='ms-auto'
						data={accounts}
						id={params.id}
						itemType='accounts'
					/>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<pre>{JSON.stringify(currAccount(), null, 2)}</pre>
			</Card.Body>
		</Card>
	);
};

export default AccountDetailsView;
