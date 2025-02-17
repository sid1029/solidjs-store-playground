import { faker } from '@faker-js/faker/locale/en_US';
import { createStore } from 'solid-js/store';

export type EmployeeDetail = {
	// name of this detail
	name: string;
	// display label
	label: string;
	// revenue generated
	revenue: number;
	// input or output
	input: boolean;
}

export type Employee = {
	id: string;
	lastName: string;
	firstName: string;
	title: string;
	salary: number;
	income: EmployeeDetails;
	spend: EmployeeDetails;
}

export type EmployeeDetails = Array<EmployeeDetail>;

export interface EmployeeUI {
	employee: Employee;
	// location
	x: number;
	y: number;
}

export type EmployeeDict = Record<string, EmployeeUI>;

export const createFakeDetails = (isInput: boolean): EmployeeDetail => ({
	name: faker.string.alphanumeric({ length: 10 }),
	label: faker.lorem.word(),
	revenue: faker.number.int({ min: 100, max: 500 }),
	input: isInput,
});

export const createFakeEmployee = (): EmployeeUI => {
	const [employeeStore] = createStore({
			id: faker.string.uuid(),
			lastName: faker.person.firstName(),
			firstName: faker.person.lastName(),
			title: faker.person.jobTitle(),
			income: [],
			spend: [],
			salary: faker.number.int({ min: 50000, max: 5000000 }),
	});
	return {
		employee: employeeStore,
		x: faker.number.int({ min: 10, max: 100 }),
		y: faker.number.int({ min: 10, max: 100 }),
	};
};
