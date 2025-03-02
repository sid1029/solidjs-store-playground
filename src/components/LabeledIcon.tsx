import type { Component, JSX } from 'solid-js';

interface LabeledIconProps {
	iconId: string;
	label: JSX.Element;
	iconAfter?: boolean;
}

const LabeledIcon: Component<LabeledIconProps> = (props: LabeledIconProps) => {
	return (
		<span class={`d-flex flex-row${props.iconAfter ? '-reverse' : ''}`}>
			<i class={`bi bi-${props.iconId} m${props.iconAfter ? 's' : 'e'}-2`} />
			{props.label}
		</span>
	);
};

export default LabeledIcon;
