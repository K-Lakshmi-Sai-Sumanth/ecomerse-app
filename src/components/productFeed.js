import Footer from "./footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import feed from "../styles/feed.module.css";
import image from "../assets/edited.png";
import shoppingImg from "../assets/shopping.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faBars } from "@fortawesome/fontawesome-free-solid";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {name, email} from "../components/signup"

const Imag = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  position: relative;
  border-radius: 5px 5px 0 0;
  transition: 0.2s ease;

  @media screen and (max-device-width: 600px) {
    height: 200px;
  }
`
const Card = styled.div`
  width: 18%;
  background-color: #f2f2f2;
  text-align: center;
  cursor: pointer;
  margin: 1%;
  border-radius: 5px;
  border: 0.5px solid #d8d8d8;
  position: relative;
  &:hover > ${Imag} {
    width: 75%;
  }
  @media screen and (max-device-width: 1000px) {
    

    &:hover > ${Imag} {
      width: 100%;
    }
  }


  @media screen and (max-device-width: 600px) {
    width: 48%;

    &:hover > ${Imag} {
      width: 100%;
    }
  }
`
const CardBody = styled.div`
  width: 100%;
`
const ButtonCart = styled.button`
  width: 100%;
  padding: 7px;
  background-color: ${(props) => (props.primary ? "red" : "#2cae00")};
  border: none;
  color: #ffffff;
  transition: 0.1s ease-in-out;
  border-radius: 0 0 5px 5px;

  &:hover {
    font-weight: 600;
  }
`

const ProductFeed = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };


  const buyProducts= ()=>{
    setModal(!modal);
    alert("Your order is placed Thank you :)")
  }
  /*--------------------------------Cart Api calling----------------------------------*/
  const cartFunc = async () => {
    const CartId = localStorage.getItem("cartIdValue");
    if (CartId) {
      try {
        const res = await axios({
          url: `https://api.chec.io/v1/carts/${CartId}`,
          method: "GET",
          headers: {
            "X-Authorization":
              "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
          },
        });
        if (res.status === 200) {
          setCart(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const res = await axios({
          url: "https://api.chec.io/v1/carts",
          method: "GET",
          headers: {
            "X-Authorization":
              "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
          },
        });
        if (res.status === 201) {
          localStorage.setItem("cartIdValue", res.data.id);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  /*--------------------------------logout button----------------------------------------*/
  const handleLogout = () => {
    localStorage.setItem("ecommerse-authToken", "");
    navigate("/login");
  };

  /*--------------------------------load products----------------------------------------*/
  const products = () => {
    axios({
      url: "https://api.chec.io/v1/products",
      method: "GET",
      headers: {
        "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
      },
      params: {
        limit: 10,
        page: 1,
      },
    })
      .then((res) => {
        setProductItems(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const addedProductsInCart = cart.line_items
    ? cart.line_items.map((value) => value.product_id)
    : [];
  /*--------------------------------handle add to cart button----------------------------------------*/
  const handleOnClick = async (productid) => {
    try {
      const cartid = localStorage.getItem("cartIdValue");
      const res = await axios({
        url: `https://api.chec.io/v1/carts/${cartid}`,
        method: "POST",
        headers: {
          "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
        },
        data: {
          id: productid,
        },
      });
      setCart(res.data.cart);
    } catch (err) {
      console.log(err.message);
    }
  };
  /*--------------------------------------remove from cart------------------------*/

  const removeFromCart = async () => {
    const lineItemId = cart.line_items[0].id;
    const cartid = localStorage.getItem("cartIdValue");
    try {
      const res = await axios({
        url: `https://api.chec.io/v1/carts/${cartid}/items/${lineItemId}`,
        method: "DELETE",
        headers: {
          "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b",
        },
      });
      setCart(res.data.cart);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  /*--------------------------------Component did mount----------------------------------*/
  useEffect(() => {
    cartFunc();
    products();
  }, []);

  /*--------------------------------Html part Start----------------------------------------*/

  return (
    <div
      className={`col-12 ${modal ? feed.mainContainer2 : feed.mainContainer} `}
    >
      <div className={` ${feed.wrapperContainer}`}>
        {modal && (
          <div className={`${feed.cartPopup}`}>
            <div onClick={toggleModal} className={`${feed.cartOverlay}`}></div>
            <div className={`${feed.modelContent}`}>
              <h1 className={`${feed.cartTitle}`}>CART </h1>
              
              {cart.line_items.length < 1 ? (
                <div style={{color:"#008e00", fontWeight: "bold", textAlign: "center"}} key="one">
                <p>No items in your cart.</p>
                <p>Please add minimum one item to place order.</p>
                <p>Thank you :)</p></div>
              ) : (
                cart.line_items.map((value, index) => {
                  return (
                    <div key={index}>
                      <div className={`${feed.productDetails}`} >
                        <div className={`col-6 ${feed.productName}`}>
                          <h2>
                            <span>Name:</span> {value.name}
                          </h2>
                          <p>
                            <span>Product id:</span> {value.product_id}
                          </p>
                        </div>
                        <div className={`col-6 ${feed.productPrice}`}>
                          <span>Price:&nbsp;</span>
                          {value.price.formatted_with_symbol}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div className={`${feed.pricing}`}>
                <span className={`col-6 ${feed.totalPrice}`}>Total Price : {cart.subtotal.formatted_with_symbol}</span>
                {cart.line_items.length < 1 ? null :
                <span className={`col-6 ${feed.buyButton}`} ><button onClick={buyProducts} className={`${feed.placeOrder}`}>Place Order</button></span>}
              </div>  
            </div>
          </div>
        )}

        {/*--------------------------------nav bar ----------------------------------------*/}
        <div className={`col-12 ${feed.navbar}`}>
          <div className={`col-2 col-md-1 ${feed.logoBlock}`}>
            <img
              src={image}
              alt="Lss Shopping Mall"
              className={`col-10  ${feed.logoImage}`}
            />
          </div>

          <div className={`col-6  ${feed.inputSearchBlock}`}>
            <input
              className={`col-9 ${feed.inputSearch}`}
              type="text"
              placeholder="Search for Products"
            />
            <button className={`col-md-2 col-3 ${feed.submitButton}`}>
              Go
            </button>
          </div>

          <div className={`col-4  ${feed.rightBlock}`}>
            <div
              onClick={toggleModal}
              className={`col-md-3 col-4 ${feed.cartSpan}`}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                className={`${feed.cartLogo}`}
              />
              <span className={`${feed.cart}`}>Cart</span>
            </div>

            <div className={`col-md-3 col-3  ${feed.dropdownDiv}`}>
              <button
                className={` col-12 ${feed.dropButton}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </button>
              <button
                className={` col-12 ${feed.menuButton}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faBars} className={`${feed.menuBars}`} />
              </button>
              <ul className={` ${feed.dropdownItems}`}>
              
                <li>{name}</li>
                <li>{email}</li>
              
                <li>
                  <button
                    className={`${feed.logoutButton}`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/*-------------------------------- image div ----------------------------------------*/}
        <div className={` ${feed.shoppingImageDiv}`}>
          <img
            className={` ${feed.shoppingImage}`}
            src={shoppingImg}
            alt="shopping"
          />
        </div>

        {/*--------------------------------products list----------------------------------------*/}
        <div style={{ margin: 0 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {productItems.map((value, index) => {
              const productId = value.id;
              return (
                <Card key={index}>
                  <Imag src={value.image.url} />
                  <CardBody>
                    <h4>{value.name}</h4>
                    <p>Price: {value.price.formatted_with_symbol}</p>
                    {/*---------------------------------add to cart button ------------------------------------- */}
                    {addedProductsInCart.includes(productId) ? (
                      <ButtonCart
                        primary
                        onClick={() => {
                          removeFromCart(productId);
                        }}
                      >
                        Remove from cart
                      </ButtonCart>
                    ) : (
                      <ButtonCart
                        onClick={() => {
                          handleOnClick(productId);
                        }}
                      >
                        Add to Cart
                      </ButtonCart>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
        {/*---------------------------------Footer---------------------*/}
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ProductFeed;
