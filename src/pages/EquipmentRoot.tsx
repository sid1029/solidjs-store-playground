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

import EquipmentRow from '@/components/EquipmentRow';
import { useCompanyContext } from '@/models/CompanyDirContext';
import type { Component } from 'solid-js';
import type { RouteSectionProps } from '@solidjs/router';
import LabeledIcon from '@/components/LabeledIcon';

const EquipmentRoot: Component<RouteSectionProps<unknown>> = () => {
	const { equipment, addFakeEquipment, equipmentCount, totalSpend } =
		useCompanyContext();

	return (
		<Container class='px-0'>
			<Row class='my-3 sticky-top'>
				<Card border='primary' class='my-2'>
					<Card.Header>Equipment</Card.Header>
					<Card.Body>
						<Card.Title>Equip count : {equipmentCount()}</Card.Title>
						<Card.Text>Equip total spend : ${totalSpend()}</Card.Text>
					</Card.Body>
				</Card>
			</Row>
			<Row class='my-2'>
				<Button
					class='mw-100'
					variant='outline-warning'
					onClick={addFakeEquipment}
				>
					<i class='pe-2 bi-plus-circle-fill' />
					Add Equipment
				</Button>
			</Row>
			<Row class='my-3'>
				<ListGroup numbered={true}>
					<Entries
						of={equipment}
						fallback={
							<Alert variant='warning' class='text-center'>
								<i class='bi-exclamation-triangle-fill pe-2' />
								Add Equipment !
							</Alert>
						}
					>
						{(equipmentId, uiEquip) => (
							<ListGroup.Item itemId={uiEquip().id}>
								{uiEquip().emoji} - {uiEquip().manufacturer} - {uiEquip().name}
								<Badge class='float-end font-monospace' bg='primary'>
									<Nav.Link href={`/equipment/${equipmentId}`}>
										<LabeledIcon
											label={equipmentId}
											iconId='info-circle'
											iconAfter
										/>
									</Nav.Link>
								</Badge>
								<EquipmentRow equipId={equipmentId} />
							</ListGroup.Item>
						)}
					</Entries>
				</ListGroup>
			</Row>
		</Container>
	);
};

export default EquipmentRoot;
