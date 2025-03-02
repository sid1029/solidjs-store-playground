import type { Component } from 'solid-js';

interface LabeledIconProps {
	iconId: string;
	label: string;
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
