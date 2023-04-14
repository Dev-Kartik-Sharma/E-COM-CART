import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Menu from "@mui/material/Menu";
import { Badge } from "@mui/material";
import { REMOVE_FROM_CART } from "../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  RemoveShoppingCart,
  ShoppingCartCheckout,
  CancelOutlined,
  DeleteRounded,
} from "@mui/icons-material";

const HeaderDropDown = () => {
  const cartItems = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const removeFromCart = (id) => {
    dispatch(REMOVE_FROM_CART(id));
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

  return (
    <>
      <Badge
        badgeContent={cartItems.length}
        color="primary"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ShoppingCart
          color="primary"
          sx={{ cursor: "pointer", fontSize: "2rem" }}
        />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {cartItems.length ? (
          <div className="card_details" style={{ width: "25rem", padding: 10 }}>
            <Table>
              <thead>
                <tr>
                  <th> Photo </th>
                  <th> Details </th>
                  <th> Price </th>
                  <th> Quantity </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((e) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                            <img
                              src={e.thumbnail}
                              style={{ width: "4rem", height: "4rem" }}
                              alt=""
                            />
                          </NavLink>
                        </td>
                        <td>
                          <p> {e.title} </p>
                        </td>
                        <td>
                          <p> ₹{e.price} </p>
                        </td>
                        <td className="text-center">
                          <p> {e.stock} </p>
                        </td>
                        <td>
                          <p
                            className="smalltrash"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeFromCart(e.id)}
                          >
                            <DeleteRounded color="error" />
                          </p>
                        </td>
                        <td>
                          <p
                            className="largetrash"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeFromCart(e.id)}
                          >
                            <DeleteRounded color="error" />
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <div className="d-flex justify-content-around">
              <p> Grand Total : ₹ {price} </p>
              <NavLink to="/detailed-cart" onClick={handleClose}>
                <p>
                  {" "}
                  <ShoppingCartCheckout color="success" /> View Cart{" "}
                </p>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="card_details d-flex justify-content-center align-items-center p-3">
            <CancelOutlined
              color="primary"
              sx={{ position: "absolute", top: 2, right: 5, cursor: "pointer" }}
              onClick={handleClose}
            />
            <p>
              {" "}
              <RemoveShoppingCart /> Your Cart is Empty !{" "}
            </p>
          </div>
        )}
      </Menu>
    </>
  );
};

export default HeaderDropDown;
