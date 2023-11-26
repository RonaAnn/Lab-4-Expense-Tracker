import { Col, Row } from "react-bootstrap";
import { getAllPayeeNames, getTotalAmount, getTotalContributedAmoutn } from "../../services/expense-utils";
import IExpenseItem from "../../models/IExpense";
import './Table.css';

type Props = {
    expenseItems: IExpenseItem[]
}
const PendingExpenseByPayee = ({ expenseItems }: Props) => {

    const payees = getAllPayeeNames(expenseItems);

    const getPendingAmount = (name: string) => {

        const totalAmout = getTotalAmount(expenseItems);

        const splitAmout = totalAmout / payees.length;

        const payeeContributedAmount = getTotalContributedAmoutn(expenseItems, name);

        if (payeeContributedAmount >= splitAmout) {

            console.log(`${name} - ${splitAmout}-${payeeContributedAmount} `);

            return (payeeContributedAmount - splitAmout);
        }
    }

    return (
        <>
            {
                getAllPayeeNames(expenseItems).map((name) => {

                    const amount = getPendingAmount(name);
                    return (

                        amount && (
                            <div key={name}>
                                <Row key={name} xs={2} sm={3} lg={5} className="mx-1">
                                    < Col className="payToData"> Pay {name}</Col >
                                    <Col xs={2} sm={2} lg={1} className="payToData">{getPendingAmount(name)}</Col>
                                </Row >
                            </div>
                        )
                    )
                })
            }
        </>
    );
}

export default PendingExpenseByPayee;