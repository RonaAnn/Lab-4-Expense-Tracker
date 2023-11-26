import IExpenseItem from "../models/IExpense";


const getAllPayeeNames = (expenseItems: IExpenseItem[]): string[] => {

    const uniqueNames: string[] = [];

    expenseItems.forEach((item) => {
        let name = item.payeeName;

        if (!uniqueNames.includes(name)) {
            uniqueNames.push(name);
        }
    })

    return uniqueNames;
}

const getTotalContributedAmoutn = (expenseItems: IExpenseItem[], name: string) => {

    let total = 0;

    expenseItems.forEach((item) => {

        if (item.payeeName === name) {
            total += item.price;
        }
    });

    return total;
}

const getTotalAmount = (expenseItems: IExpenseItem[]) => {

    let total = 0;

    expenseItems.forEach((item) => {

        total += item.price;
    });

    return total;
}

const formatDate = (date: Date) => {
    const newDate = new Date(date);

    return (
        newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate()
    );
}

export { getAllPayeeNames, getTotalContributedAmoutn, getTotalAmount, formatDate }