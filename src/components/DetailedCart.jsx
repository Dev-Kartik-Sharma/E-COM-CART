import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { DeleteRounded } from "@mui/icons-material";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  ADD_TO_CART,
  QUANTITY_DECREMENT,
  CLEAR_CART,
} from "../redux/actions/action";
import {
  ShoppingCartCheckoutOutlined,
  DangerousOutlined,
} from "@mui/icons-material";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

const DetailedCart = () => {
  const [price, setPrice] = useState(0);
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(REMOVE_FROM_CART(id));
  };

  const addToCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const quantityDec = (item) => {
    dispatch(QUANTITY_DECREMENT(item));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const grandTotal = () => {
    let price = 0;
    cartItems.map((item, id) => {
      price = price + item.price * item.stock;
    });
    setPrice(price);
  };

  useEffect(() => {
    grandTotal();
  }, [grandTotal]);

  if (cartItems.length >= 1) {
    return (
      <>
        <h2 className="text-center"> My Shopify CART </h2>
        <div className="cartContainer d-flex justify-content-around">
          <div classname="items-container">
            {cartItems.map((e) => {
              return (
                <>
                  <section className="container mt-3">
                    <div className="itemsdetails">
                      <div className="items_img">
                        <img src={e.thumbnail} alt="image" />
                      </div>
                      <div className="details">
                        <Table>
                          <tr>
                            <td>
                              <p>
                                {" "}
                                <strong> Category : </strong> {e.category}{" "}
                              </p>
                              <p>
                                {" "}
                                <strong> Title : </strong> {e.title}{" "}
                              </p>
                              <p>
                                {" "}
                                <strong> Price : </strong> ₹ {e.price}{" "}
                              </p>
                              <p>
                                {" "}
                                <strong> Description : </strong> {e.description}{" "}
                              </p>
                            </td>
                            <td>
                              <p>
                                {" "}
                                <strong> Rating : </strong> <br />
                                <span
                                  style={{
                                    background: "green",
                                    color: "#fff",
                                    padding: "3px 5px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {" "}
                                  {e.rating} ★{" "}
                                </span>{" "}
                              </p>
                              <p>
                                {" "}
                                <strong> Brand : </strong> {e.brand}{" "}
                              </p>
                              <p>
                                {" "}
                                <strong> Item Total : </strong> ₹{" "}
                                {e.price * e.stock}{" "}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                  width: 100,
                                  cursor: "pointer",
                                  background: "#ddd",
                                  color: "#111",
                                }}
                              >
                                {e.stock > 1 ? (
                                  <span
                                    style={{ fontSize: 24 }}
                                    onClick={() => quantityDec(e)}
                                  >
                                    -
                                  </span>
                                ) : (
                                  <span style={{ fontSize: 24 }}>-</span>
                                )}
                                <span style={{ fontSize: 24 }}>{e.stock}</span>
                                <span
                                  style={{ fontSize: 24 }}
                                  onClick={() => addToCart(e)}
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td>
                              <p
                                style={{ cursor: "pointer" }}
                                onClick={() => removeFromCart(e.id)}
                              >
                                {" "}
                                <DeleteRounded color="error" /> Remove{" "}
                              </p>
                            </td>
                          </tr>
                        </Table>
                      </div>
                    </div>
                  </section>
                </>
              );
            })}
          </div>
          <div className="checkout-container">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://cdn-icons-png.flaticon.com/512/536/536473.png"
              />
              <Card.Body>
                <Card.Title> Total Price : ₹ {price} </Card.Title>
                <Card.Text>
                  Pay using UPI / Debit card / Credit card / COD
                </Card.Text>
                <div className="d-flex justify-content-around">
                  <Button variant="danger" onClick={() => clearCart()}>
                    {" "}
                    <DangerousOutlined /> Clear Cart{" "}
                  </Button>
                  <Button variant="success">
                    {" "}
                    <ShoppingCartCheckoutOutlined /> Checkout{" "}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ flexDirection: "column" }}
        >
          <h2> Your Cart is Empty ! Continue Shopping </h2>
          <div>
            <NavLink to="/">
              {" "}
              <Button> Continue </Button>{" "}
            </NavLink>
          </div>
        </div>
      </>
    );
  }
};

export default DetailedCart;
