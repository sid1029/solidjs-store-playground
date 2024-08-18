import {
	Alert,
	Button,
	ButtonGroup,
	Col,
	Container,
	ListGroup,
	Row,
} from 'solid-bootstrap';

import { Key } from '@solid-primitives/keyed';

import EquipmentRow from '@/components/EquipmentRow';
import PersonRow from '@/components/PersonRow';
import { useCompanyContext } from '@/models/CompanyDirContext';

export default function Root() {
	const {
		people,
		equipment,
		addFakePerson,
		addFakeEquipment,
		totalRevenue,
		totalSpend,
	} = useCompanyContext();

	return (
		<Container>
			<Row class='my-3'>
				<Col class='d-flex flex-row gap-5'>
					<span>People count : {people.length}</span>
					<span>Total revenue : ${totalRevenue()}</span>
				</Col>
				<Col class='d-flex flex-row gap-5'>
					<span>Equip count : {equipment.length}</span>
					<span>Equip total spend : ${totalSpend()}</span>
				</Col>
			</Row>
			<Row class='my-3'>
				<ButtonGroup>
					<Button variant='outline-primary' onClick={addFakePerson}>
						Add Person&nbsp;&nbsp;
						<i class='bi-plus-lg' />
					</Button>
					<Button variant='outline-primary' onClick={addFakeEquipment}>
						<i class='bi-plus-lg' />
						&nbsp;&nbsp;Add Equipment
					</Button>
				</ButtonGroup>
			</Row>
			<Row xs={2}>
				<ListGroup numbered={true}>
					<Key
						each={people}
						by={(uiPerson) => uiPerson.person.id}
						fallback={<Alert variant='warning'>Add People !</Alert>}
					>
						{(uiPerson, idx) => (
							<ListGroup.Item itemId={uiPerson().person.id}>
								{uiPerson().person.firstName}&nbsp;
								{uiPerson().person.lastName}&nbsp;
								{uiPerson().person.title}
								<PersonRow personIdx={idx()} />
							</ListGroup.Item>
						)}
					</Key>
				</ListGroup>
				<ListGroup numbered={true}>
					<Key
						each={equipment}
						by='id'
						fallback={<Alert variant='warning'>Add Equipment !</Alert>}
					>
						{(uiEquip, idx) => (
							<ListGroup.Item
								itemId={uiEquip().id}
								class='d-flex flex-column gap-1'
							>
								{uiEquip().manufacturer} - {uiEquip().name}
								<span class='text-truncate'>
									{uiEquip().spend} - {uiEquip().contract}
								</span>
								<EquipmentRow equipIdx={idx()} />
							</ListGroup.Item>
						)}
					</Key>
				</ListGroup>
			</Row>
		</Container>
	);
}
