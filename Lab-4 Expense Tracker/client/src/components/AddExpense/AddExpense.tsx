import { FormEvent, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IExpenseItem, { IExpenseAddItem } from "../../models/IExpense";
import { getAllPayeeNames } from "../../services/expense-utils";
import { addNewExpense } from "../../services/expense-service";
import "./AddExpense.css";

type Props = {
    expenseItems: IExpenseItem[],
    refresh: (newExpense: IExpenseItem) => void
}

const AddExpense = ({ expenseItems, refresh }: Props) => {

    const [show, setShow] = useState(false);
    const nameRef = useRef<HTMLSelectElement>(null);
    const descRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const payeeNames = () => {

        return getAllPayeeNames(expenseItems);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const payeeName = (nameRef?.current?.value as string);

        const expenseDescription = (descRef?.current?.value as string);

        const price = parseFloat(priceRef?.current?.value as string);

        const expenseDate = new Date(dateRef?.current?.value as string);

        const finalData: IExpenseAddItem = {
            payeeName,
            expenseDescription,
            price,
            date: expenseDate
        }

        const response = await addNewExpense(finalData);

        handleClose();

        refresh(response);
    }

    const addExpenseForm = () => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="required">Name</Form.Label>
                    <Form.Select aria-label="Default select example"
                        ref={nameRef}
                        required
                    >
                        <option hidden value=''>Select a Payee</option>
                        {
                            payeeNames().map((names) => {

                                return (
                                    <option value={names} key={names}>{names}</option>
                                )
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="required">Product purchased</Form.Label>
                    <Form.Control type="text" placeholder="description" required ref={descRef} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="required">Price</Form.Label>
                    <Form.Control type="number" placeholder="0" required ref={priceRef} step="0.01" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="required">Date</Form.Label>
                    <Form.Control type="date" required ref={dateRef} />
                </Form.Group>

                <div className="btn">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </div>
            </Form>
        );
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ float: 'right' }}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Title className="m-auto my-3" >Add new Item</Modal.Title>
                <div className="subText mx-2">Read the below instruction before proceeding</div>
                <div className="instruction mx-2">Make sure you fill all the fields where * is provided</div>
                <hr />
                <Modal.Body>{addExpenseForm()}</Modal.Body>
            </Modal>
        </>
    );
}

export default AddExpense;