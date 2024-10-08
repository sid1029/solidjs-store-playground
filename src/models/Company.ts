import { faker } from '@faker-js/faker';
import { createStore } from 'solid-js/store';

export interface IDetail {
	name: string;
	label: string;
	input: boolean;
}

export class PersonDetail implements IDetail {
	// name of this detail
	name = '';
	// display label
	label = '';
	// revenue generated
	revenue = 0;
	// input or output
	input = false;
}

export type PersonDetails = Array<PersonDetail>;

export class Person {
	public id = '';
	public lastName = '';
	public firstName = '';
	public title = '';

	// list of input Details
	public inputs: PersonDetails = [];

	// list of output Details
	public outputs: PersonDetails = [];

	constructor(props: Partial<Person>) {
		Object.assign(this, props);
	}
}

export interface PersonUI {
	person: Person;
	// location
	x: number;
	y: number;
}

export interface EquipmentUI {
	id: string;
	name: string;
	manufacturer: string;
	contract: string;
	spend: number;
	x: number;
	y: number;
}

export const createFakeDetails = (isInput: boolean): PersonDetail => ({
	name: faker.string.alphanumeric({ length: 10 }),
	label: faker.lorem.word(),
	revenue: faker.number.int({ min: 100, max: 500 }),
	input: isInput,
});

export const createFakePerson = (): PersonUI => {
	// Store has to be explicitly created when object is created using 'new'.
	// We can ignore the setter returned by createStore since the parent
	// setter will still be able to reach into this object via path params
	// in order to make edits.
	// See PersonRow._onEdit(), CompanyDirectoryContextModel.addDetailTo() etc...
	const [personStore] = createStore(
		new Person({
			id: faker.string.uuid(),
			lastName: faker.person.firstName(),
			firstName: faker.person.lastName(),
			title: faker.person.jobTitle(),
			inputs: [],
			outputs: [],
		}),
	);
	return {
		person: personStore,
		x: faker.number.int({ min: 10, max: 100 }),
		y: faker.number.int({ min: 10, max: 100 }),
	};
};

export const createFakeEquipment = (): EquipmentUI => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	manufacturer: faker.commerce.department(),
	contract: faker.commerce.productDescription(),
	spend: faker.number.int({ min: 500, max: 65000 }),
	x: faker.number.int({ min: 10, max: 100 }),
	y: faker.number.int({ min: 10, max: 100 }),
});
