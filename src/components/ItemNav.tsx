import { Nav } from 'solid-bootstrap';
import { type Component, createMemo } from 'solid-js';
import LabeledIcon from '@/components/LabeledIcon';
import { A } from '@solidjs/router';

interface ItemNavProps {
	itemType: string;
	id: string;
	data: Record<string, unknown>;
	class?: string;
}

const ItemNav: Component<ItemNavProps> = (props: ItemNavProps) => {
	const prevNext = createMemo(() =>
		getPreviousAndNextKeys(props.data, props.id),
	);

	function getPreviousAndNextKeys<T>(
		data: Record<string, T>,
		key: string,
	): [string | undefined, string | undefined] {
		const keys = Object.keys(data);
		const currentIndex = keys.indexOf(key);

		if (currentIndex === -1) {
			return [undefined, undefined];
		}

		const previousIndex = currentIndex - 1;
		const nextIndex = currentIndex + 1;

		const previous =
			keys[previousIndex] !== undefined ? keys[previousIndex] : undefined;
		const nextItem =
			keys[nextIndex] !== undefined ? keys[nextIndex] : undefined;

		return [previous, nextItem];
	}

	return (
		<Nav class={props.class ?? ''}>
			<Nav.Item>
				<Nav.Link
					as={A}
					eventKey='previous'
					href={`/${props.itemType}/${prevNext()[0]}`}
					disabled={prevNext()[0] === undefined}
				>
					<LabeledIcon iconId='arrow-left-square' label='Previous' />
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					eventKey='next'
					href={`/${props.itemType}/${prevNext()[1]}`}
					disabled={prevNext()[1] === undefined}
				>
					<LabeledIcon iconId='arrow-right-square' label='Next' iconAfter />
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};

export default ItemNav;
