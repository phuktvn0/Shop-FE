import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../Redux/Actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const qty = new URLSearchParams(location.search).get("qty") || 1;
  const color = new URLSearchParams(location.search).get("color") || 1;
  const size = new URLSearchParams(location.search).get("size") || 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems
    .reduce((a, { qty, price }) => a + qty * price, 0)
    .toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, color, size));
    }
  }, [dispatch, productId, qty, color, size]);

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng đang trống!!!
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              MUA SẮM NGAY!!!
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Số Lượng Sản Phẩm
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartitem */}
            {cartItems.map((item) => (
              <div className="cart-item row" key={item.product}>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                    <h6>Size: {item.size}</h6>
                    <h6>Màu sắc: {item.color}</h6>
                  </Link>
                </div>

                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>SỐ LƯỢNG</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(
                          item.product,
                          Number(e.target.value),
                          item.color,
                          item.size
                        )
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  {console.log(cartItems)}
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h4> </h4>
                  <h4>{`Giá ${item.price} VND`}</h4>
                  <div
                    onClick={() => removeFromCartHandler(item.product)}
                    className="remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng cộng:</span>
              <span className="total-price">{total} VND</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Tiếp Tục Mua Sắm</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Thanh Toán</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
