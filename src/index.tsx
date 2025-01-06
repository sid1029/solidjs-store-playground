/* @refresh reload */
import './index.scss';
import { render } from 'solid-js/web';

import App from './App';

const root = document.getElementById('root');

// biome-ignore lint/style/noNonNullAssertion: getting root DOM element to obtain entrypoint.
render(() => <App />, root!);
