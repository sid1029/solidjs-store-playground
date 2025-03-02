import { createMemo } from 'solid-js';

import { Card, NavLink } from 'solid-bootstrap';
import ItemNav from '@/components/ItemNav';
import LabeledIcon from '@/components/LabeledIcon';

import { useCompanyContext } from '@/models/CompanyDirContext';
import { type Component, Show } from 'solid-js';
import { A, useParams, type RouteSectionProps } from '@solidjs/router';

const EquipmentDetailsView: Component<RouteSectionProps<unknown>> = () => {
	const { equipment } = useCompanyContext();
	const params = useParams();
	const currEquip = createMemo(() => equipment[params.id]);

	return (
		<Card border='secondary' class='my-2'>
			<Card.Header>
				<Card.Title class='d-flex align-items-baseline mb-0'>
					<NavLink
						as={A}
						type='button'
						class='me-2 p-2 btn btn-outline-success'
						href='/equipment'
					>
						<LabeledIcon iconId='arrow-left-circle' label='Back' />
					</NavLink>
					<Show when={currEquip()}>
						<span>
							{currEquip().emoji} - {currEquip().name}
						</span>
					</Show>
					<ItemNav
						class='ms-auto'
						data={equipment}
						id={params.id}
						itemType='equipment'
					/>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<pre>{JSON.stringify(currEquip(), null, 2)}</pre>
			</Card.Body>
		</Card>
	);
};

export default EquipmentDetailsView;
