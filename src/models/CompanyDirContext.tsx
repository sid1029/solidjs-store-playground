import { createContext, useContext, type JSX, createMemo } from 'solid-js';
import { createStore, produce, type SetStoreFunction } from 'solid-js/store';

import {
	createFakeDetails,
	createFakeEquipment,
	createFakeAccount,
	type AccountDetail,
	type AccountDict,
	type EquipmentDict,
} from './Company';

const INIT_COUNT = Math.floor(Math.random() * 20);

// Global singleton data store that houses the state of the entire app.
export class CompanyDirectoryContextModel {
	public accounts: AccountDict;
	public setAccount: SetStoreFunction<AccountDict>;
	public equipment: EquipmentDict;
	public setEquipment: SetStoreFunction<EquipmentDict>;

	constructor() {
		[this.accounts, this.setAccount] = createStore<AccountDict>(
			Object.fromEntries(
				Array.from({ length: INIT_COUNT }, () => {
					const fakeAccount = createFakeAccount();
					return [fakeAccount.account.id, fakeAccount];
				}),
			),
		);
		[this.equipment, this.setEquipment] = createStore<EquipmentDict>(
			Object.fromEntries(
				Array.from({ length: INIT_COUNT }, () => {
					const fakeEquip = createFakeEquipment();
					return [fakeEquip.id, fakeEquip];
				}),
			),
		);
	}

	public addFakeAccount: VoidFunction = () => {
		const fakeAccount = createFakeAccount();
		this.setAccount(fakeAccount.account.id, fakeAccount);
	};

	public accountCount = () => {
		return Object.keys(this.accounts).length;
	};

	public addFakeEquipment: VoidFunction = () => {
		const fakeEquip = createFakeEquipment();
		this.setEquipment(fakeEquip.id, fakeEquip);
	};

	public equipmentCount = () => {
		return Object.keys(this.equipment).length;
	};

	public deleteAccountAt = (id: string) => {
		this.setAccount(produce((accounts: AccountDict) => delete accounts[id]));
	};

	public deleteEquipmentAt = (id: string) => {
		this.setEquipment(produce((equips: EquipmentDict) => delete equips[id]));
	};

	public addDetailTo = (accountId: string, isIncome: boolean) => {
		const account = this.accounts[accountId].account;
		const details = isIncome ? account.income : account.spend;
		this.setAccount(
			accountId,
			'account',
			isIncome ? 'income' : 'spend',
			details.length,
			createFakeDetails(isIncome),
		);
	};

	public removeAccountFrom = (
		accountId: string,
		isIncome: boolean,
		connIdx: number,
	) => {
		this.setAccount(
			accountId,
			'account',
			isIncome ? 'income' : 'spend',
			produce((details) => details.splice(connIdx, 1)),
		);
	};

	public get totalSpend() {
		const calculateTotalFn = createMemo(() =>
			Object.entries(this.equipment).reduce(
				(acc, [_equipId, equip]) => acc + equip.spend,
				0,
			),
		);
		return calculateTotalFn;
	}

	public get totalRevenue() {
		return createMemo(() =>
			Object.entries(this.accounts).reduce((acc, [_accountId, account]) => {
				const sumDeals = (dealTotal: number, detail: AccountDetail) =>
					dealTotal + detail.revenue;
				return (
					acc +
					account.account.income.reduce(sumDeals, 0) -
					account.account.spend.reduce(sumDeals, 0)
				);
			}, 0),
		);
	}
}

interface CompanyContextProps {
	children: JSX.Element;
	value: CompanyDirectoryContextModel;
}

export const CompanyContext = createContext<CompanyDirectoryContextModel>(
	{} as CompanyDirectoryContextModel,
);

export function CompanyContextProvider(props: CompanyContextProps) {
	return (
		<CompanyContext.Provider value={props.value}>
			{props.children}
		</CompanyContext.Provider>
	);
}

export function useCompanyContext() {
	return useContext(CompanyContext);
}
