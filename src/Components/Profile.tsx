// Customer.js

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar/Nav";
import { Link, redirect } from "react-router-dom";
import "./Profile.css";

function Customer() {
  const [customer, setCustomer] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("access");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/api/customer/",
          config
        );
        if (response.status == 200) {
          setCustomer(response.data);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setPhone(response.data.phone);
        } else if (response.status == 404) {
          redirect();
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem("access");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const updatedCustomer = {
        ...customer,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };

      await axios.patch(
        "http://127.0.0.1:8000/api/customer/",
        updatedCustomer,
        config
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
    setIsSaving(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h1>{customer.first_name}</h1>
        </div>
        <div className="profile-info">
          <div className="profile-row">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="profile-row">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="profile-row">
            <label>Email:</label>
            <span>{customer.email}</span>
          </div>
          <div className="profile-row">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button>Cancel</button>
        </div>
        <hr />{" "}
        <Link to="/login-register">
          <button className="profile-logout">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default Customer;
