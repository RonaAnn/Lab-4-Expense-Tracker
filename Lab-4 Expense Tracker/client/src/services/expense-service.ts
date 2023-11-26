import axios from "axios";
import IExpenseItem, { IExpenseAddItem } from "../models/IExpense";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAllExpenses = async () => {

    const result = await axios.get<IExpenseItem[]>(`${baseUrl}/expenses`);

    return result.data;
}

const addNewExpense = async (newExpenseItem: IExpenseAddItem) => {

    const result = await axios.post<IExpenseItem>(`${baseUrl}/expenses`, newExpenseItem, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.data;
}

export { getAllExpenses, addNewExpense }