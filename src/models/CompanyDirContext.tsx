import { createContext, useContext, type JSX, createMemo } from 'solid-js';
import { createStore, produce, type SetStoreFunction } from 'solid-js/store';

import {
	createFakeDetails,
	createFakeEquipment,
	createFakePerson,
	type EquipmentUI,
	type PersonDetail,
	type PersonUI,
} from './Company';

const INIT_COUNT = Math.floor(Math.random() * 20);

// Global singleton data store that houses the state of the entire app.
export class CompanyDirectoryContextModel {
	public people: Array<PersonUI>;
	public setPeople: SetStoreFunction<Array<PersonUI>>;
	public equipment: Array<EquipmentUI>;
	public setEquipment: SetStoreFunction<Array<EquipmentUI>>;

	constructor() {
		[this.people, this.setPeople] = createStore<Array<PersonUI>>(
			[...Array(INIT_COUNT)].map(createFakePerson),
		);
		[this.equipment, this.setEquipment] = createStore<Array<EquipmentUI>>(
			[...Array(INIT_COUNT)].map(createFakeEquipment),
		);
	}

	public addFakePerson: VoidFunction = () => {
		this.setPeople(this.people.length, createFakePerson);
	};

	public addFakeEquipment: VoidFunction = () => {
		this.setEquipment(this.equipment.length, createFakeEquipment);
	};

	public deletePersonAt = (idx: number) => {
		this.setPeople(produce((people) => people.splice(idx, 1)));
	};

	public deleteEquipmentAt = (idx: number) => {
		this.setEquipment(produce((equips) => equips.splice(idx, 1)));
	};

	public addDetailTo = (personIdx: number, isInput: boolean) => {
		const p = this.people[personIdx].person;
		const details = isInput ? p.inputs : p.outputs;
		this.setPeople(
			personIdx,
			'person',
			isInput ? 'inputs' : 'outputs',
			details.length,
			createFakeDetails(isInput),
		);
	};

	public removeDetailFrom = (
		personIdx: number,
		isInput: boolean,
		connIdx: number,
	) => {
		this.setPeople(
			personIdx,
			'person',
			isInput ? 'inputs' : 'outputs',
			produce((details) => details.splice(connIdx, 1)),
		);
	};

	public get totalSpend() {
		const calculateTotalFn = createMemo(() =>
			this.equipment.reduce((acc, e) => acc + e.spend, 0),
		);
		return calculateTotalFn;
	}

	public get totalRevenue() {
		const calculateRevFn = createMemo(() =>
			this.people.reduce((acc, p) => {
				const sumDeals = (dealTotal: number, detail: PersonDetail) =>
					dealTotal + detail.revenue;
				return (
					acc +
					p.person.inputs.reduce(sumDeals, 0) +
					p.person.outputs.reduce(sumDeals, 0)
				);
			}, 0),
		);
		return calculateRevFn;
	}
}

interface CompanyContextProps {
	children: JSX.Element;
	model: CompanyDirectoryContextModel;
}

export const CompanyContext = createContext<CompanyDirectoryContextModel>(
	{} as CompanyDirectoryContextModel,
);

export function CompanyContextProvider(props: CompanyContextProps) {
	console.log('Creatign company context.');
	return (
		<CompanyContext.Provider value={props.model}>
			{props.children}
		</CompanyContext.Provider>
	);
}

export function useCompanyContext() {
	return useContext(CompanyContext);
}
