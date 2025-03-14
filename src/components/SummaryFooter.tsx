import Home from '@/pages/Home';
import { Button, Card, Offcanvas } from 'solid-bootstrap';
import { createSignal, type VoidComponent } from 'solid-js';

const SummaryFooter: VoidComponent = () => {
	const [showSummary, setShowSummary] = createSignal(false);

	const emptyRouteProps = {
		data: {},
		location: {
			pathname: '/',
			search: '',
			query: {},
			state: '',
			hash: '',
			key: '',
		},
		params: {},
	};

	return (
		<Card.Footer>
			<Button
				class='my-2 mw-100'
				variant='outline-warning'
				onClick={() => setShowSummary(true)}
			>
				<i class='pe-2 bi-easel2' />
				Summary
			</Button>
			<Offcanvas
				style={{
					'--bs-offcanvas-width': '20vw',
					'--bs-offcanvas-padding-y': '0.5rem',
				}}
				placement='end'
				show={showSummary()}
				onHide={() => setShowSummary(false)}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title class='fw-bold'>Company Summary</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Home {...emptyRouteProps} />
				</Offcanvas.Body>
			</Offcanvas>
		</Card.Footer>
	);
};

export default SummaryFooter;
