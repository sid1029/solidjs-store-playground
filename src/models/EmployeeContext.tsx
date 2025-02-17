import { createContext, useContext, type JSX, createMemo } from 'solid-js';
import { createStore, produce, type SetStoreFunction } from 'solid-js/store';

import { createFakeEmployee, type EmployeeDict } from './Employee';

const INIT_COUNT = Math.floor(Math.random() * 20);

// Global singleton data store that houses the state of the entire app.
export class EmployeeDirectoryContextModel {
	public employees: EmployeeDict;
	public setEmployees: SetStoreFunction<EmployeeDict>;

	constructor() {
		// Generate fake data with INIT_COUNT no. of employee entries.
		[this.employees, this.setEmployees] = createStore<EmployeeDict>(
			Object.fromEntries(
				Array.from({ length: INIT_COUNT }, () => {
					const fakeEmp = createFakeEmployee();
					return [fakeEmp.employee.id, createFakeEmployee()];
				}),
			),
		);
	}

	public getEmployee = (id: string) => {
		return this.employees[id];
	};

	public employeeCount = () => {
		return Object.keys(this.employees).length;
	};

	public addFakeEmployee: VoidFunction = () => {
		const fakeEmp = createFakeEmployee();
		this.setEmployees(fakeEmp.employee.id, createFakeEmployee);
	};

	public deleteEmployee = (id: string) => {
		this.setEmployees(
			produce((dict: EmployeeDict) => {
				delete dict[id];
			}),
		);
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
	value: EmployeeDirectoryContextModel;
}

export const EmployeeContext = createContext<EmployeeDirectoryContextModel>(
	{} as EmployeeDirectoryContextModel,
);

export function EmployeeContextProvider(props: EmployeeContextProps) {
	return (
		<EmployeeContext.Provider value={props.value}>
			{props.children}
		</EmployeeContext.Provider>
	);
}

export function useEmployeeContext() {
	return useContext(EmployeeContext);
}
