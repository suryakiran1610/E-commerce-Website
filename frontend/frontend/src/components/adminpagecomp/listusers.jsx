import React, { useEffect, useState } from "react";
import "./listusers.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";

function Listusers() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  const [userlist, setUserlist] = useState(true);
  const [orderlist, setOrderlist] = useState(false);

  const handleback = () => {
    setUserlist(true);
    setOrderlist(false);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/myapp/userlist/")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const deluser = (userId) => {
    axios
      .delete("http://127.0.0.1:8000/myapp/userlistdelete/" + userId)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== userId));
        console.log("User deleted successfully");
        toast.success("User Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const viewuser = (userId) => {
    setUserlist(false);
    setOrderlist(true);
    axios
      .get(`http://127.0.0.1:8000/myapp/orderlists/?userId=${userId}`)
      .then((response) => {
        setOrder(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const calculateSubtotal = (quantity, price) => {
    return quantity * price;
  };

  return (
    <>
      {userlist && (
        <div className="maintablediv">
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date Joined</th>
                  <th>Action</th>
                  <th>Order Details</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="profile-image12">
                        <img
                          src={`http://127.0.0.1:8000${user.user_image}`}
                          alt="User Profile"
                        />
                      </div>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.date_joined}</td>
                    <td className="tabledel3" onClick={() => deluser(user.id)}>
                      Delete
                    </td>
                    <td className="tableview13" onClick={() => viewuser(user.id)}>
                      View
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {orderlist && (
       <div className="matlabdiv">
  <div className="maintablediv">
    <div className="tableContainer">
      <div>
        <div className="details1">
          <h2>ORDERS</h2>
        </div>
        <div className="cartpagemainscreen12">
          <div className="mainbox12">
            <div className="box1234">
              <IoMdArrowRoundBack className="box1234backicon" onClick={handleback} />
              <div className="box2121">
                <p>No</p>
                <p className="box31name">Name</p>
              </div>
              <div className="box3131">
                <p className="box31price">Quantity</p>
                <p className="box31quantity">Price</p>
                <p className="box31total">Shipping Address</p>
              </div>
            </div>
            {order.map((orders, index) => (
              <div className="containerr20" key={index}>
                <div className="containerr21">
                  <p>{index + 1}</p>
                </div>
                <div className="containerr23">
                  <p>{orders.product_name}</p>
                  <p>{orders.product_quantity}</p>
                </div>
                <div className="containerr24">
                  <p>RS {calculateSubtotal(orders.product_quantity, orders.product_total)}/-</p>
                </div>
                <div className="containerr25">
                  <p>{orders.shipingaddress}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
)}

      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}

export default Listusers;
