import React, { useEffect, useState, useReducer } from "react";
import * as EXPENSE_TYPES from "../redux/Products/action";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getDataSelector } from "../redux/Products/selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import CloseButton from "react-bootstrap/CloseButton";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
var qs = require("qs");

function Main({ GET_DATA }) {
  console.log("********&&&&&&&&&&&&&77", JSON.stringify(GET_DATA.data));
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(EXPENSE_TYPES.addTransactionStart());
  }, [ignored]);

  const state = useSelector(getDataSelector);

  const amounts =
    state?.data !== null && state?.data !== undefined && state?.data.length >= 0
      ? state?.data?.map((transaction) => Number(transaction.amount))
      : console.log("error 1");

  const [defaultIncome, setDefaultIncome] = useState(() => {
    const storedIncome = localStorage.getItem("income");
    return storedIncome ? storedIncome : 0;
  });

  const onSub = (event) => {
    event.preventDefault();
    setDefaultIncome(inco);
    localStorage.setItem("income", inco);
    toggleAddIncome(false);
  };

  const income = defaultIncome;
  const expenses = amounts?.reduce((acc, item) => acc + item);

  const [isAddTextVisible, toggleAddText] = useState(false);
  const [isAddIncomeVisible, toggleAddIncome] = useState(false);
  const [search, setSearch] = useState("");
  const [inco, setInco] = useState(true);
  const balance = defaultIncome - expenses;
  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3031/user/${id}`);
      dispatch(EXPENSE_TYPES.deleteTransaction(id));
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [amount, setAmount] = useState();

  const onSubmit = async (event) => {
    const expense = {
      name,
      amount,
    };
    try {
      await axios.post(`http://localhost:3031/user`, qs.stringify(expense));
      dispatch(EXPENSE_TYPES.addListsStart(expense));
      forceUpdate();
      toggleAddText(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditData = async (id, name, amount) => {
    const expense = {
      name,
      amount,
    };
    try {
      await axios.put(
        `http://localhost:3031/user/${id}`,
        qs.stringify(expense)
      );
      dispatch(EXPENSE_TYPES.editTransaction(id, expense));
      forceUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background">
      <Navbar />
      <div className="container">
        <div className="mt-4 mb-3 row d-flex justify-content-center align-content-center">
          <button
            className="btn btn-danger col-3"
            onClick={() => toggleAddText(!isAddTextVisible)}
          >
            {isAddTextVisible ? "Cancel" : "Add Expenses"}
          </button>
          <span className="col-1"></span>
          <button
            className="btn btn-danger col-3"
            onClick={() => toggleAddIncome(!isAddIncomeVisible)}
          >
            {isAddIncomeVisible ? "Cancel" : "Add Income"}
          </button>
          {isAddIncomeVisible && (
            <form onSubmit={onSub}>
              <Card className="text-center mt-2 bg-info">
                <Card.Body>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Income Amount"
                    value={inco}
                    onChange={(event) => setInco(event.target.value)}
                  />
                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </Card.Body>
              </Card>
            </form>
          )}
          {isAddTextVisible && (
            <form onSubmit={onSubmit}>
              <Card className="text-center mb-3 mt-2 bg-info text-white">
                <Card.Body>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Description
                      </span>
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="form-control"
                      placeholder="Enter Text"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Amount</span>
                    </div>
                    <input
                      type="number"
                      id="cost"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="form-control"
                      placeholder="Enter Amount"
                      aria-label="Amount"
                      aria-describedby="basic-addon1"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Transaction
                  </button>
                </Card.Body>
              </Card>
            </form>
          )}
        </div>
        <div className="row">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card bg-info">
              <div className="card-body">
                <h5 className="card-title fw-bold">Income</h5>
                <p className="card-text">₹{income}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card bg-info">
              <div className="card-body">
                <h5 className="card-title fw-bold">Expenses</h5>
                <p className="card-text">₹{expenses}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card bg-info">
              <div className="card-body d-flex flex-row">
                <div>
                  <h5 className="card-title fw-bold">Balance</h5>
                  <p className="card-text">₹{balance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5 className="text-light mt-1">Transactions</h5>
          <div className="form-outline mb-4">
            <input
              type="search"
              className="form-control"
              placeholder="Search Expenses Here.........."
              id="datatable-search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {state?.data !== null &&
        state?.data !== undefined &&
        state?.data.length > 0
          ? state?.data
              ?.filter((item) =>
                item?.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <div key={item.id} className="container p-1">
                  <ListGroup>
                    <ListGroup.Item
                      variant="info"
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item?.name}</div>
                      </div>
                      <div className="fw-bold">
                      ₹{item?.amount}</div>
                      <span className="mx-2"></span>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                          const newName = prompt("Enter new name:", item.name);
                          const newAmount = prompt(
                            "Enter new amount:",
                            item.amount
                          );
                          handleEditData(item.id, newName, newAmount);
                        }}
                      >
                        Edit
                      </Button>
                      <CloseButton
                        className="mx-1"
                        aria-label="Hide"
                        onClick={() => handleDeleteData(item?.id)}
                      />
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              ))
          : console.log("error")}
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  GET_DATA: getDataSelector,
});
export default connect(mapStateToProps)(Main);
