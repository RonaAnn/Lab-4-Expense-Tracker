import { Col, Row } from "react-bootstrap";
import IExpenseItem from "../../models/IExpense";
import { getAllPayeeNames, getTotalAmount, getTotalContributedAmoutn } from '../../services/expense-utils';
import "./Table.css";

type Props = {
    expenseItems: IExpenseItem[];
}
const ExpensesByPayees = ({ expenseItems }: Props) => {

    return (
        <>
            <hr /><br />
            <Row xs={2} sm={3} lg={5} className="mx-1">
                <Col className="paymentDetails size">Total:</Col>
                <Col xs={2} sm={2} lg={1} className="paymentDetails size" style={{ backgroundColor: '#009378' }}>{getTotalAmount(expenseItems)}</Col>
            </Row>
            {
                getAllPayeeNames(expenseItems).map((name) => {

                    return (
                        <Row xs={2} sm={3} lg={5} key={name} className="mx-1">
                            <Col className="paymentDetails size">{name}</Col>
                            <Col xs={2} sm={2} lg={1} className="paymentDetails size">{getTotalContributedAmoutn(expenseItems, name)}</Col>
                        </Row>
                    )
                })
            }
        </>
    );
}

export default ExpensesByPayees;