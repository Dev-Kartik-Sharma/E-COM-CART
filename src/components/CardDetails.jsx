import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { DeleteRounded } from "@mui/icons-material";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_CART,
  ADD_TO_CART,
  QUANTITY_DECREMENT,
} from "../redux/actions/action";

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const compare = () => {
    let compareData = cartItems.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  const removeFromCart = (id) => {
    dispatch(REMOVE_FROM_CART(id));
    redirect("/");
  };

  const addToCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const quantityDec = (item) => {
    dispatch(QUANTITY_DECREMENT(item));
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center"> Product Details </h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {data.map((e) => {
              return (
                <>
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
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => quantityDec(e)}
                            >
                              -
                            </span>
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
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
