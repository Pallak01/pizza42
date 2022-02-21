// src/views/order-history.js -----Order History Tab------

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

  const OrderHistory = () => {
  const [message,setMessage] = useState('');
  const [message1,setMessage1] = useState('');
  const [message2,setMessage2] = useState('');
  const [message3,setMessage3] = useState('');
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const APItoken = process.env.REACT_APP_API_TOKEN;
  const { getAccessTokenSilently } = useAuth0();

  const callSecureApi = async () => {                     //Calling an API to retrieve User's Order History
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

      const userMetadataresponse = await fetch(
        `${serverUrl}/api/v2/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${APItoken}`,
          },
        },
      );


      const userMetadataInfo = await userMetadataresponse.json();
     
      const orderHistory1 = userMetadataInfo.user_metadata.Orders1;                //Retrieving and Displaying orders accordingly
      const orderHistory2 = userMetadataInfo.user_metadata.Orders2;
      const orderHistory3 = userMetadataInfo.user_metadata.Orders3;
      if(orderHistory1 && orderHistory2 && orderHistory3)
     {
      setMessage3('Pizza:'+orderHistory3.Pizza+', OrderedAt:'+orderHistory3.OrderedAt+', Tip='+orderHistory3.Tip+', Total='+orderHistory3.Total);
      setMessage2('Pizza:'+orderHistory2.Pizza+', OrderedAt:'+orderHistory2.OrderedAt+', Tip='+orderHistory2.Tip+', Total='+orderHistory2.Total);
      setMessage1('Pizza:'+orderHistory1.Pizza+', OrderedAt:'+orderHistory1.OrderedAt+', Tip='+orderHistory1.Tip+', Total='+orderHistory1.Total);
     }
      else if(orderHistory1 && orderHistory2)
     {
      setMessage2('Pizza:'+orderHistory2.Pizza+', OrderedAt:'+orderHistory2.OrderedAt+', Tip='+orderHistory2.Tip+', Total='+orderHistory2.Total);
      setMessage1('Pizza:'+orderHistory1.Pizza+', OrderedAt:'+orderHistory1.OrderedAt+', Tip='+orderHistory1.Tip+', Total='+orderHistory1.Total);
     }
      else if(orderHistory1 && orderHistory3)
     {

      setMessage3('Pizza:'+orderHistory3.Pizza+', OrderedAt:'+orderHistory3.OrderedAt+', Tip='+orderHistory3.Tip+', Total='+orderHistory3.Total);
      setMessage1('Pizza:'+orderHistory1.Pizza+', OrderedAt:'+orderHistory1.OrderedAt+', Tip='+orderHistory1.Tip+', Total='+orderHistory1.Total);
     }
      else if(orderHistory3 && orderHistory2)
     {

      setMessage3('Pizza:'+orderHistory3.Pizza+', OrderedAt:'+orderHistory3.OrderedAt+', Tip='+orderHistory3.Tip+', Total='+orderHistory3.Total);
	setMessage2('Pizza:'+orderHistory2.Pizza+', OrderedAt:'+orderHistory2.OrderedAt+', Tip='+orderHistory2.Tip+', Total='+orderHistory2.Total);
     }
     else if(orderHistory1)
     {

      setMessage1('Pizza:'+orderHistory1.Pizza+', OrderedAt:'+orderHistory1.OrderedAt+', Tip='+orderHistory1.Tip+', Total='+orderHistory1.Total);
     }
     else if(orderHistory3)
     {

      setMessage3('Pizza:'+orderHistory3.Pizza+', OrderedAt:'+orderHistory3.OrderedAt+', Tip='+orderHistory3.Tip+', Total='+orderHistory3.Total);
     }
     else if(orderHistory2)
     {

      setMessage2('Pizza:'+orderHistory2.Pizza+', OrderedAt:'+orderHistory2.OrderedAt+', Tip='+orderHistory2.Tip+', Total='+orderHistory2.Total);
     }
     } catch (error) {
      setMessage("No Order placed yet.");
    }
  };


   return (
    <div className="container">
      <h1>Order History</h1>
      <p>
        Click on Order History to get your previous orders.
      </p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="Your Order History"
      >
        <button type="button" className="btn btn-primary" onClick={callSecureApi}>
          Get Order History
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
       {message1 && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message1}</code>
            </div>
          </div>
        </div>
      )}
       {message2 && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message2}</code>
            </div>
          </div>
        </div>
      )}
       {message3 && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message3}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
