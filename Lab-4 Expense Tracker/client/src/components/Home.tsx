import { useState, useEffect } from "react";
import { getAllExpenses } from "../services/expense-service";
import IExpenseItem from "../models/IExpense";
import ExpensesList from "./DisplayExpense/ExpensesList";
import ExpensesByPayees from "./DisplayExpense/ExpensesByPayees";
import PendingExpenseByPayee from "./DisplayExpense/PendingExpenseByPayee";
import AddExpense from "./AddExpense/AddExpense";
import { Col, Row } from "react-bootstrap";
import "./Home.css";

const Home = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getAllExpenses();

                setExpenseItems(data);
            } catch (error) { }
        };

        fetchExpenses();
    }, []);

    const refresh = (newExpnese: IExpenseItem) => {

        setExpenseItems([...expenseItems, newExpnese])
    }

    return (
        <div className="m-2">
            <h3 className="heading my-2">Expense Tracker</h3>
            <Row>
                <Col xs={12} sm={10} md={11} lg={11}><ExpensesList expenseItems={expenseItems} /></Col>
                <Col sm={2} md={1} lg={1}><AddExpense expenseItems={expenseItems} refresh={refresh} /></Col>
            </Row>
            <ExpensesByPayees expenseItems={expenseItems} />
            <PendingExpenseByPayee expenseItems={expenseItems} />
        </div>
    );
};

export default Home;
