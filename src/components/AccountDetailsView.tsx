import { type Component, createMemo, Show } from 'solid-js';

import { Card, NavLink } from 'solid-bootstrap';
import ItemNav from '@/components/ItemNav';
import LabeledIcon from '@/components/LabeledIcon';

import { useCompanyContext } from '@/models/CompanyDirContext';
import { A, useParams, type RouteSectionProps } from '@solidjs/router';

const AccountDetailsView: Component<RouteSectionProps<unknown>> = () => {
	const { accounts } = useCompanyContext();
	const params = useParams();
	const currAccount = createMemo(() => accounts[params.id]);

	return (
		<Card border='secondary' class='my-2'>
			<Card.Header>
				<Card.Title class='d-flex align-items-baseline mb-0'>
					<NavLink
						as={A}
						type='button'
						class='me-2 p-2 btn btn-outline-success'
						href='/accounts'
					>
						<LabeledIcon iconId='arrow-left-circle' label='Back' />
					</NavLink>
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
