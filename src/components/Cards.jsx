import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/actions/action";
import { Box, CircularProgress } from "@mui/material";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    setLoading(true);
    const response = await axios.get("https://dummyjson.com/products/");
    setLoading(false);
    return setData(response.data.products);
  };

  const sendToReducer = (element) => {
    dispatch(ADD_TO_CART(element));
  };

  const emptyStock = () => {
    data.map((element, id) => {
      element.stock = 0;
    });
  };

  useEffect(() => {
    emptyStock();
  }, [fetchDataFromAPI]);

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center"> New Products </h2>
        <div className="row d-flex justify-content-center align-items-center">
          {loading ? (
            <Box
              sx={{ height: 300 }}
              className="d-flex justify-content-center align-items-center"
            >
              <CircularProgress />
            </Box>
          ) : (
            data.map((element, id) => {
              return (
                <>
                  <Card
                    className="mx-2 mt-4 card_style"
                    style={{ width: "22rem", border: "none" }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.thumbnail}
                      style={{ height: "16rem", marginTop: "12px" }}
                    />
                    <Card.Body>
                      <Card.Title> {element.title} </Card.Title>
                      <Card.Text>Price : ₹ {element.price}</Card.Text>
                      <div className="button_div d-flex justify-content-center">
                        <Button
                          variant="primary"
                          className="col-lg-12"
                          onClick={() => sendToReducer(element)}
                        >
                          {" "}
                          Add to cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Cards;
