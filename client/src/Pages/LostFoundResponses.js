import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRaisedHand,
  getLostFoundItemResponses,
} from "../redux/actions/LostFoundActions";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";

function LostFoundResponses() {
  const dispatch = useDispatch();
  const encodedToken = localStorage.getItem("jwt");
  const decoded = jwt_decode(encodedToken);
  const user_details = {
    _id: decoded._id,
  };
  const token = decoded.auth_token;
  const responses = useSelector((state) => state.lostFound.lostFoundResponses);
  console.log(responses);

  useEffect(() => {
    dispatch(getLostFoundItemResponses({ user_details, token }));
  }, []);

  const handleClick = (e, response) => {
    e.preventDefault();
    if (e.target.value === "accept") {
      dispatch(acceptRaisedHand({ _id: response._id, user_details, token }));
    } else if (e.target.value === "decline") {
      console.log(e.target);
    }
  };

  return (
    <div className="resposneMainContainer">
      <div className="responseMainWrapper">
        {responses.length > 0 ? (
          responses.map((response, index) => {
            return (
              <div key={index} className="responseContainer">
                <div className="responseProfileImageContainer">
                  <img
                    className="responseprofileImage"
                    src={response.raised_by_details.profile_picture}
                  />
                </div>
                <div className="responseDataContainer">
                  <div className="responseData">
                    <h5 className="dataLabel">Item Name: </h5>
                    <p>{response.product_details.name}</p>
                  </div>
                  {response.note.length > 0 && (
                    <div className="responseData">
                      <h5 className="dataLabel">Note : </h5>
                      <p>{response.product_details.note}</p>
                    </div>
                  )}
                  <div className="responseData">
                    <h5 className="dataLabel">Raised by : </h5>
                    <p>{response.raised_by_details.name}</p>
                  </div>
                </div>
                <div className="responseButtonContainer">
                  <Button
                    style={{ height: "60%", margin: "2%" }}
                    size="medium"
                    variant="contained"
                    color="success"
                    value="accept"
                    onClick={(e) => handleClick(e, response)}
                  >
                    Accept
                  </Button>
                  <Button
                    style={{ height: "60%", margin: "2% 0" }}
                    size="medium"
                    variant="contained"
                    color="error"
                    value="decline"
                    onClick={(e) => handleClick(e, response)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No responses as of now</div>
        )}
      </div>
    </div>
  );
}

export default LostFoundResponses;
