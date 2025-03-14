import { Alert, Badge, Button, Card, ListGroup, Nav } from 'solid-bootstrap';

import { Entries } from '@solid-primitives/keyed';

import EquipmentRow from '@/components/EquipmentRow';
import { useCompanyContext } from '@/models/CompanyDirContext';
import type { Component } from 'solid-js';
import { A, type RouteSectionProps } from '@solidjs/router';
import LabeledIcon from '@/components/LabeledIcon';
import SummaryFooter from '@/components/SummaryFooter';

const EquipmentRoot: Component<RouteSectionProps<unknown>> = () => {
	const { equipment, addFakeEquipment, equipmentCount, totalSpend } =
		useCompanyContext();

	return (
		<>
			<Card border='primary' class='my-2 sticky-top'>
				<Card.Header>Equipment</Card.Header>
				<Card.Body>
					<Card.Title>Equip count : {equipmentCount()}</Card.Title>
					<Card.Text>Equip total spend : ${totalSpend()}</Card.Text>
				</Card.Body>
				<SummaryFooter />
			</Card>
			<Button
				class='my-2 mw-100'
				variant='outline-warning'
				onClick={addFakeEquipment}
			>
				<i class='pe-2 bi-plus-circle-fill' />
				Add Equipment
			</Button>
			<ListGroup class='my-2' numbered={true}>
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
							<Badge class='float-end font-monospace' bg='success'>
								<Nav.Link as={A} href={`/equipment/${equipmentId}`}>
									<LabeledIcon label={equipmentId} iconId='info-circle' />
								</Nav.Link>
							</Badge>
							<EquipmentRow equipId={equipmentId} />
						</ListGroup.Item>
					)}
				</Entries>
			</ListGroup>
		</>
	);
};

export default EquipmentRoot;
