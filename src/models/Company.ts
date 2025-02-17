import { faker } from '@faker-js/faker/locale/en_US';
import { createStore } from 'solid-js/store';

export interface IDetail {
	name: string;
	label: string;
	input: boolean;
}

export class AccountDetail implements IDetail {
	// name of this detail
	name = '';
	// display label
	label = '';
	// revenue generated
	revenue = 0;
	// input or output
	input = false;
}

export type AccountDetails = Array<AccountDetail>;

export class Account {
	public id = '';
	public lastName = '';
	public firstName = '';
	public title = '';

	// list of account revenue income.
	public income: AccountDetails = [];

	// list of account spend income.
	public spend: AccountDetails = [];

	constructor(props: Partial<Account>) {
		Object.assign(this, props);
	}
}

export interface AccountUI {
	account: Account;
	// location
	x: number;
	y: number;
}

export type AccountDict = Record<string, AccountUI>;

export interface EquipmentUI {
	id: string;
	name: string;
	manufacturer: string;
	contract: string;
	spend: number;
	x: number;
	y: number;
}

export type EquipmentDict = Record<string, EquipmentUI>;

export const createFakeDetails = (isInput: boolean): AccountDetail => ({
	name: faker.string.alphanumeric({ length: 10 }),
	label: faker.lorem.word(),
	revenue: faker.number.int({ min: 100, max: 500 }),
	input: isInput,
});

export const createFakeAccount = (): AccountUI => {
	// Store has to be explicitly created when object is created using 'new'.
	// We can ignore the setter returned by createStore since the parent
	// setter will still be able to reach into this object via path params
	// in order to make edits.
	// See AccountRow._onEdit(), CompanyDirectoryContextModel.addDetailTo() etc...
	const [accountStore] = createStore(
		new Account({
			id: faker.string.uuid(),
			lastName: faker.person.firstName(),
			firstName: faker.person.lastName(),
			title: faker.person.jobTitle(),
			income: [],
			spend: [],
		}),
	);
	return {
		account: accountStore,
		x: faker.number.int({ min: 10, max: 100 }),
		y: faker.number.int({ min: 10, max: 100 }),
	};
};

export const createFakeEquipment = (): EquipmentUI => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	manufacturer: faker.commerce.department(),
	contract: faker.commerce.productDescription(),
	spend: faker.number.int({ min: 500, max: 5000 }),
	x: faker.number.int({ min: 10, max: 100 }),
	y: faker.number.int({ min: 10, max: 100 }),
});
