
interface IExpenseItem {

    id: number,
    payeeName: string,
    expenseDescription: string,
    price: number,
    date: Date
}

export type IExpenseAddItem = Omit<IExpenseItem, "id">;

export default IExpenseItem;