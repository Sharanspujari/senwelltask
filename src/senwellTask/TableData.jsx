import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const TableData = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let setTimeOutId = "";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUserData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    let id = e.target.value;
    setSearchQuery(id);
    
    if (setTimeOutId) {
      clearTimeout(setTimeOutId);
    }
    setTimeOutId = setTimeout(() => {
      if (id === "") {
        return setFilteredData(userData);
      }
      const updatedfilteredData = [...userData].filter((item, i) => {
        return item.id == id;
      });
      setFilteredData(updatedfilteredData);
    }, 500);
  };

  const deleteUser = (singleUser) => {
    const remainingData = [...userData].filter(
      (user) => user.id !== singleUser.id
    );
    setFilteredData(remainingData);
    setUserData(remainingData);
    setSearchQuery("");
  };

  const resetData = () => {
    fetchUsers();
  };

  return (
    <div>
      <div>
        <label>Search:</label>
        <input onChange={handleSearch} value={searchQuery} />
      </div>
      <div>
        <button
          onClick={resetData}
          style={{ padding: "6px", marginTop: "20px" }}
        >
          Reset
        </button>
      </div>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>UserName</th>
          <th>Action</th>
        </thead>
        <tbody>
          {filteredData?.map((user, i) => {
            return (
              <tr
                key={user.id}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  padding: "30px",
                  cursor: "pointer",
                }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td onClick={() => deleteUser(user)}>Delete</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
