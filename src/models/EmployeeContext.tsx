import { createContext, useContext, type JSX, createMemo } from 'solid-js';
import { createStore, produce, type SetStoreFunction } from 'solid-js/store';

import { createFakeEmployee, type EmployeeDict } from './Employee';
import { faker } from '@faker-js/faker';

const INIT_COUNT = Math.floor(Math.random() * 20);

// Global singleton data store that houses the state of the entire app.
export class EmployeeDirectoryContextModel {
	public employees: EmployeeDict;
	public setEmployees: SetStoreFunction<EmployeeDict>;

	constructor() {
		[this.employees, this.setEmployees] = createStore<EmployeeDict>(
			// Generate fake data with INIT_COUNT no. of employee entries.
			Object.fromEntries(
				Array.from({ length: INIT_COUNT }, () => [
					faker.string.uuid(),
					createFakeEmployee(),
				]),
			),
		);
	}

	public getEmployee = (id: string) => {
		return this.employees[id];
	};

	public getEmployees = () => {
		return this.employees;
	};

	public addFakeEmployee: VoidFunction = () => {
		this.setEmployees(faker.string.uuid(), createFakeEmployee);
	};

	public deleteEmployee = (id: string) => {
		this.setEmployees(
			produce((dict: EmployeeDict) => {
				delete dict[id];
			}),
		);
	};

	public addEmployee = (employeeId: string) => {
		this.setEmployees(employeeId, createFakeEmployee());
	};

	public get totalSalary() {
		const calculateTotalFn = createMemo(() =>
			Object.entries(this.employees).reduce(
				(acc, [_empId, empUi]) => acc + empUi.employee.salary,
				0,
			),
		);
		return calculateTotalFn;
	}
}

interface EmployeeContextProps {
	children: JSX.Element;
	model: EmployeeDirectoryContextModel;
}

export const EmployeeContext = createContext<EmployeeDirectoryContextModel>(
	{} as EmployeeDirectoryContextModel,
);

export function EmployeeContextProvider(props: EmployeeContextProps) {
	return (
		<EmployeeContext.Provider value={props.model}>
			{props.children}
		</EmployeeContext.Provider>
	);
}

export function useEmployeeContext() {
	return useContext(EmployeeContext);
}
