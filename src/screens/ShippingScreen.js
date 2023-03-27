import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h6>ĐỊA CHỈ GIAO HÀNG</h6>

          <input
            type="text"
            placeholder="Số nhà - Tên đường"
            defaultValue={address}
            {...register("address", { required: true })}
          />
          {errors.address && <span>Address is required</span>}

          <input
            type="text"
            placeholder="Tỉnh - Thành Phố"
            defaultValue={city}
            {...register("city", { required: true })}
          />
          {errors.city && <span>City is required</span>}
          <input
            type="text"
            placeholder="Mã code"
            defaultValue={postalCode}
            {...register("postalCode", { required: true })}
          />
          {errors.postalCode && <span>Postal code is required</span>}
          <input
            type="text"
            placeholder="Đơn vị vận chuyển"
            defaultValue={country}
            {...register("country", { required: true })}
          />
          {errors.country && <span>Country is required</span>}
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
