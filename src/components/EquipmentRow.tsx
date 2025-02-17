import { createMemo } from 'solid-js';

import { Button, Col, Form, FormGroup, Stack } from 'solid-bootstrap';

import type { EquipmentUI } from '@/models/Company';
import { useCompanyContext } from '@/models/CompanyDirContext';

interface EquipmentRowProps {
	equipId: string;
}

export default function EquipmentRow(props: EquipmentRowProps) {
	const { equipment, setEquipment, deleteEquipmentAt } = useCompanyContext();

	const _editProp = (e: InputEvent, property: keyof EquipmentUI) => {
		const inputElem = e.target as HTMLInputElement;
		const value = inputElem.value;
		if (inputElem.type === 'number') {
			let num = Number.parseFloat(inputElem.value);
			if (Number.isNaN(num)) {
				num = 0;
			}
			setEquipment(props.equipId, property, num);
		} else {
			setEquipment(props.equipId, property, value);
		}
	};

	// Create a computed signal that sums the length of all equip properties.
	const currEquip = createMemo(() => equipment[props.equipId]);

	return (
		<Col class='d-flex pt-2 flex-column gap-3'>
			<span class='text-nowrap text-truncate'>{currEquip().contract}</span>
			<Stack direction='horizontal' class='align-items-baseline' gap={2}>
				<FormGroup as={Col} controlId='name'>
					<Form.Control
						value={currEquip().name}
						onInput={(evt) => _editProp(evt, 'name')}
						type='text'
						placeholder='Name'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='contract'>
					<Form.Control
						value={currEquip().contract}
						onInput={(evt) => _editProp(evt, 'contract')}
						type='text'
						placeholder='Contract'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='manufacturer'>
					<Form.Control
						value={currEquip().manufacturer}
						onInput={(evt) => _editProp(evt, 'manufacturer')}
						type='text'
						placeholder='Manufacturer'
					/>
				</FormGroup>
				<FormGroup as={Col} controlId='spend'>
					<Form.Control
						value={currEquip().spend}
						onInput={(evt) => _editProp(evt, 'spend')}
						type='number'
						placeholder='Spend'
					/>
				</FormGroup>
				<div class='vr' />
				<Button
					variant='danger'
					onClick={() => deleteEquipmentAt(props.equipId)}
				>
					<i class='bi-trash' />
				</Button>
			</Stack>
		</Col>
	);
}
