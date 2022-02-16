import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import "../Components/Lost_Found/LostFound.css";
import {
  editLostFoundItem,
  getLostFoundProductDetails,
  resetStatus,
} from "../redux/actions/LostFoundActions";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Edit_MyLostFoundItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  // const location=useLocation();

  const token = localStorage.getItem("jwt");
  const decoded = jwt_decode(token);
  const product_id = params.id;
  const product = useSelector((state) => state.lostFound.singleProduct.Product);

  const [name, setName] = useState(product.name ? product.name : "");
  const [description, setDescription] = useState(
    product.description ? product.description : ""
  );
  const [brand, setBrand] = useState(product.brand ? product.brand : "");
  const [color, setColor] = useState(product.color ? product.color : "");
  const [category, setCategory] = useState(
    product.category ? product.category : ""
  );
  const [lostDate, setLostDate] = useState(
    product.lost_date ? product.lost_date : ""
  );
  const [lostTime, setLostTime] = useState(
    product.lost_time ? product.lost_time : ""
  );
  const [lostLocation, setLostLocation] = useState(
    product.lost_location ? product.lost_location : ""
  );
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispatch(getLostFoundProductDetails({ product_id, decoded }));
  }, []);

  const Status2 = useSelector((state) => state.lostFound.editlostfoundResponse);

  if (Status2 === 200) {
    dispatch(resetStatus);
    navigate("/sidebar/myOwnLostFoundItems");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    const decoded = jwt_decode(token);

    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("lost_date", lostDate);
    formData.append("lost_time", lostTime);
    formData.append("lost_location", lostLocation);
    formData.append("token", decoded.auth_token);
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    dispatch(editLostFoundItem(formData));
  };

  return (
    <div style={{ height: "100vh" }}>
      <form className="addItemForm" onSubmit={handleSubmit}>
        <div className="left">
          <div className="inputContainer">
            <label htmlFor="item" className="inputLabel">
              Item Lost
            </label>
            <input
              className="formInput"
              type="text"
              id="item"
              defaultValue={name}
              placeholder="enter item name you lost"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="brand" className="inputLabel">
              Brand
            </label>
            <input
              className="formInput"
              type="text"
              defaultValue={brand}
              id="brand"
              placeholder="enter brand of the item you lost"
              onChange={(e) => setBrand(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="category" className="inputLabel">
              Category
            </label>
            <input
              className="formInput"
              type="text"
              defaultValue={category}
              id="category"
              placeholder="category of item"
              onChange={(e) => setCategory(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="color" className="inputLabel">
              Color
            </label>
            <input
              className="formInput"
              type="name"
              defaultValue={color}
              id="color"
              placeholder="primary color of item"
              onChange={(e) => setColor(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="images" className="inputLabel">
              Images of Item
            </label>
            <input
              className="formInput"
              type="file"
              multiple
              id="images"
              placeholder="Add images of item (if any)"
              onChange={(e) => setFiles([...files, ...e.target.files])}
            ></input>
          </div>
        </div>
        <div className="right">
          <div className="inputContainer">
            <label htmlFor="date" className="inputLabel">
              Date
            </label>
            <input
              className="formInput"
              type="date"
              defaultValue={lostDate}
              id="date"
              placeholder="date when item lost"
              onChange={(e) => setLostDate(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="time" className="inputLabel">
              Time
            </label>
            <input
              className="formInput"
              type="time"
              defaultValue={lostTime}
              id="time"
              placeholder="time when item lost"
              onChange={(e) => setLostTime(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="location" className="inputLabel">
              Location
            </label>
            <input
              className="formInput"
              type="text"
              defaultValue={lostLocation}
              id="location"
              placeholder="location where item lost"
              onChange={(e) => setLostLocation(e.target.value)}
              required
            ></input>
          </div>
          <div className="inputContainer">
            <label htmlFor="description" className="inputLabel">
              Description
            </label>
            <textarea
              className="formInput"
              type="textarea"
              id="description"
              defaultValue={description}
              placeholder="tell us more about item, additional information"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="inputContainer">
            <button
              type="submit"
              className="primary submitBtn"
              style={{ marginBottom: "1.5rem" }}
            >
              SAVE
            </button>
          </div>
          <div></div>
        </div>
      </form>
    </div>
  );
}

export default Edit_MyLostFoundItems;