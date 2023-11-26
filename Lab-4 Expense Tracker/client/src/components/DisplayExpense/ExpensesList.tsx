import { Col, Row } from "react-bootstrap";
import IExpenseItem from "../../models/IExpense";
import { formatDate } from "../../services/expense-utils";
import "./Table.css";

type Props = {
    expenseItems: IExpenseItem[];
};

const ExpensesList = ({ expenseItems }: Props) => {

    return (
        <>
            <Row className="m-auto">
                <Col className="expensesHeader size">Date</Col>
                <Col xs={3} sm={5} lg={8} className="expensesHeader size">Product Purchased</Col>
                <Col className="expensesHeader size">Price</Col>
                <Col className="expensesHeader size">Payee</Col>
            </Row>
            {expenseItems.map((item) => {
                return (
                    <Row key={item.id} className="m-auto">
                        <Col className="size whiteBg">{formatDate(item.date)}</Col>
                        <Col xs={3} sm={5} lg={8} className="size blueBg">{item.expenseDescription}</Col>
                        <Col className="size whiteBg">{item.price}</Col>
                        <Col className="size blueBg">{item.payeeName}</Col>
                    </Row>
                );
            })}
        </>
    );
};

export default ExpensesList;
