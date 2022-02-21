// src/views/order-pizza.js--------Order Pizza Tab------------

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

 const axios = require("axios").default;
 const OrderPizza = () => {
 const [message, setMessage] = useState("");
 const serverUrl = process.env.REACT_APP_SERVER_URL;
 const APItoken = process.env.REACT_APP_API_TOKEN;             // API token stored in .env file with other URLs
 const { getAccessTokenSilently } = useAuth0();
 const date_ob = new Date();
 const date = ("0" + date_ob.getDate()).slice(-2);            //to get current system time of order
 const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
 const year = date_ob.getFullYear();
 const hours = date_ob.getHours();
 const minutes = date_ob.getMinutes();
 const update_time= (year + "-" + month + "-" + date + " " + hours + ":" + minutes);

  const callSecureApi1 = async () => {                       //Calling API to order  pizza
    try {
      const token = await getAccessTokenSilently();

      const userInforesponse = await fetch(
        `https://dev-icemc2h3.us.auth0.com/userinfo`,
        {
          headers: {

                Authorization: `Bearer ${token}`,
          },
        },
      );

      const userInfo = await userInforesponse.json();
      const userId = userInfo.sub;                          //fetching user ID
      const url = `${serverUrl}/api/v2/users/${userId}`;
      const everified =  userInfo.email_verified;
      if(everified){
      const userMetadataresponse = await fetch(            //fetching metadata of this user
        `${serverUrl}/api/v2/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${APItoken}`,
          },
        },
      );
      const options = {
                      method: 'PATCH',                              //http PATCH method for ordering pizza
                      url: `${serverUrl}/api/v2/users/${userId}`,
                      headers: {
                                  Authorization: `Bearer ${APItoken}`, 'content-type': 'application/json'},
                      data: {
                              user_metadata: {
                                              "Orders1": 
                                                {
                                                  "id": 1,
                                                  "Pizza": "Chicken Taco",
                                                  "OrderedAt": update_time,
                                                  "Tip": "1$",
                                                  "Total": "25$"
                                                }
                                                  
                                              }
                            }
                    };

  axios.request(options).then(function (response) {
  setMessage('Your Chicken Taco Pizza Order has been placed. Please goto Order History Tab to view your order'); //Displaying result
  });}
  else{
   setMessage('Please verify your email address before placing your order.'); //If email is not verified, user can't order pizza
  }

 
      } catch (error) {
      setMessage(error.message);
    }
  };
const callSecureApi2 = async () => {
    try {
      const token = await getAccessTokenSilently();

      const userInforesponse = await fetch(
        `https://dev-icemc2h3.us.auth0.com/userinfo`,
        {
          headers: {

                Authorization: `Bearer ${token}`,
          },
        },
      );

      const userInfo = await userInforesponse.json();
      const userId = userInfo.sub;
      const url = `${serverUrl}/api/v2/users/${userId}`;
      const everified =  userInfo.email_verified;
      if(everified){
      const userMetadataresponse = await fetch(
        `${serverUrl}/api/v2/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${APItoken}`,
          },
        },
      );
      const options = {
                      method: 'PATCH',
                      url: `${serverUrl}/api/v2/users/${userId}`,
                      headers: {
                                  Authorization: `Bearer ${APItoken}`, 'content-type': 'application/json'},
                      data: {
                              user_metadata: {
                                              "Orders2":
                                                {
                                                  "id": 2,
                                                  "Pizza": "Pepperoni",
                                                  "OrderedAt": update_time,
                                                  "Tip": "3$",
                                                  "Total": "20$"
                                                }

                                              }
                            }
                    };

  axios.request(options).then(function (response) {
  setMessage('Your Pepperoni Pizza Order has been placed. Please goto Order History Tab to view your order');
  });}
  else{
   setMessage('Please verify your email address before placing your order.');
  }


      } catch (error) {
      setMessage(error.message);
    }
  };
const callSecureApi3 = async () => {
    try {
      const token = await getAccessTokenSilently();

      const userInforesponse = await fetch(
        `https://dev-icemc2h3.us.auth0.com/userinfo`,
        {
          headers: {

                Authorization: `Bearer ${token}`,
          },
        },
      );

      const userInfo = await userInforesponse.json();
      const userId = userInfo.sub;
      const url = `${serverUrl}/api/v2/users/${userId}`;
      const everified =  userInfo.email_verified;
      if(everified){
      const userMetadataresponse = await fetch(
        `${serverUrl}/api/v2/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${APItoken}`,
          },
        },
      );
      const options = {
                      method: 'PATCH',
                      url: `${serverUrl}/api/v2/users/${userId}`,
                      headers: {
                                  Authorization: `Bearer ${APItoken}`, 'content-type': 'application/json'},
                      data: {
                              user_metadata: {
                                              "Orders3":
                                                {
                                                  "id": 3,
                                                  "Pizza": "Cheese Pizza",
                                                  "OrderedAt": update_time,
                                                  "Tip": "5$",
                                                  "Total": "15$"
                                                }

                                              }
                            }
                    };

  axios.request(options).then(function (response) {
  setMessage('Your Cheese Pizza Order has been placed. Please goto Order History Tab to view your order');
  });}
  else{
   setMessage('Please verify your email address before placing your order.');
  }


      } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Order your Delicious Pizza!</h1>
      <p>
        Start your order right here. We make our pizzas with hand-made gluten free dough. The Pizza 42 menu features speciality pizzas which are delivered to you or available for a pickup.</p>
      <div className="btn-group mt-5" role="group" aria-label="Your Choices">
        <button type="button" className="btn btn-primary" onClick={callSecureApi1}>      
          Chicken Taco
        </button>
        <button type="button" className="btn btn-primary" onClick={callSecureApi2}>
          Pepperoni Pizza
        </button>
        <button type="button" className="btn btn-primary" onClick={callSecureApi3}>
          Cheese Pizza
        </button>
       </div>
        {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
);
};

export default OrderPizza;
