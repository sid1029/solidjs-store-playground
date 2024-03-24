import { createMemo } from 'solid-js';

import { Button, Col, Form, FormGroup, Stack } from 'solid-bootstrap';

import { EquipmentUI } from '@/models/Company';
import { useCompanyContext } from '@/models/CompanyDirContext';

interface EquipmentRowProps {
    equipIdx: number;
}

export default function EquipmentRow(props: EquipmentRowProps) {
	const { equipment, setEquipment, deleteEquipmentAt } = useCompanyContext();

	const _editProp = (e: InputEvent, property: keyof EquipmentUI) => {
		const inputElem = e.target as HTMLInputElement;
		let value = inputElem.value;
		if (inputElem.type === 'number') {
			let num = parseFloat(inputElem.value);
			if (isNaN(num)) {
				num = 0;
			}
			setEquipment(props.equipIdx, property, num);
		} else {
			setEquipment(props.equipIdx, property, value);
		}
	};

	// Create a computed signal that sums the length of all equip properties.
	const currEquip = createMemo(() => equipment[props.equipIdx]);

	return (
		<Stack direction="horizontal" class="align-items-baseline" gap={2}>
			<FormGroup as={Col} controlId="name">
				<Form.Control
					value={currEquip().name}
					onInput={(evt) => _editProp(evt, 'name')}
					type="text" placeholder="Name"
				/>
			</FormGroup>
			<FormGroup as={Col} controlId="contract">
				<Form.Control
					value={currEquip().contract}
					onInput={(evt) => _editProp(evt, 'contract')}
					type="text" placeholder="Contract"
				/>
			</FormGroup>
			<FormGroup as={Col} controlId="manufacturer">
				<Form.Control
					value={currEquip().manufacturer}
					onInput={(evt) => _editProp(evt, 'manufacturer')}
					type="text" placeholder="Manufacturer"
				/>
			</FormGroup>
			<FormGroup as={Col} controlId="spend">
				<Form.Control
					value={currEquip().spend}
					onInput={(evt) => _editProp(evt, 'spend')}
					type="number" placeholder="Spend"
				/>
			</FormGroup>
			<div class="vr" />
			<Button variant="danger" onClick={() => deleteEquipmentAt(props.equipIdx)}>
				<i class="bi-trash" />
			</Button>
		</Stack>
	);
}