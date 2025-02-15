import { createContext, useContext, type JSX, createMemo } from 'solid-js';
import { createStore, produce, type SetStoreFunction } from 'solid-js/store';

import {
	createFakeDetails,
	createFakeEquipment,
	createFakeAccount,
	type EquipmentUI,
	type AccountDetail,
	type AccountUI,
} from './Company';

const INIT_COUNT = Math.floor(Math.random() * 20);

// Global singleton data store that houses the state of the entire app.
export class CompanyDirectoryContextModel {
	public accounts: Array<AccountUI>;
	public setAccount: SetStoreFunction<Array<AccountUI>>;
	public equipment: Array<EquipmentUI>;
	public setEquipment: SetStoreFunction<Array<EquipmentUI>>;

	constructor() {
		[this.accounts, this.setAccount] = createStore<Array<AccountUI>>(
			[...Array(INIT_COUNT)].map(createFakeAccount),
		);
		[this.equipment, this.setEquipment] = createStore<Array<EquipmentUI>>(
			[...Array(INIT_COUNT)].map(createFakeEquipment),
		);
	}

	public addFakeAccount: VoidFunction = () => {
		this.setAccount(this.accounts.length, createFakeAccount);
	};

	public addFakeEquipment: VoidFunction = () => {
		this.setEquipment(this.equipment.length, createFakeEquipment);
	};

	public deleteAccountAt = (idx: number) => {
		this.setAccount(produce((account) => account.splice(idx, 1)));
	};

	public deleteEquipmentAt = (idx: number) => {
		this.setEquipment(produce((equips) => equips.splice(idx, 1)));
	};

	public addAccountTo = (accountIdx: number, isIncome: boolean) => {
		const account = this.accounts[accountIdx].account;
		const details = isIncome ? account.income : account.spend;
		this.setAccount(
			accountIdx,
			'account',
			isIncome ? 'income' : 'spend',
			details.length,
			createFakeDetails(isIncome),
		);
	};

	public removeAccountFrom = (
		accountIdx: number,
		isIncome: boolean,
		connIdx: number,
	) => {
		this.setAccount(
			accountIdx,
			'account',
			isIncome ? 'income' : 'spend',
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
		return createMemo(() =>
			this.accounts.reduce((acc, p) => {
				const sumDeals = (dealTotal: number, detail: AccountDetail) =>
					dealTotal + detail.revenue;
				return (
					acc +
					p.account.income.reduce(sumDeals, 0) -
					p.account.spend.reduce(sumDeals, 0)
				);
			}, 0),
		);
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
	return (
		<CompanyContext.Provider value={props.model}>
			{props.children}
		</CompanyContext.Provider>
	);
}

export function useCompanyContext() {
	return useContext(CompanyContext);
}
