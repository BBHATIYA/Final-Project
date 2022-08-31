import { useState, useEffect } from "react";
import "../App.css";

const Branches = (props) => {
  const [branch, setBranch] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/branch")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setBranch(data);
      });
  }, []);

  return (
    <div>
      <h1> All Branches</h1>
      <input
        placeholder="Search by City name.."
        id="branch-input"
        onChange={(event) => setQuery(event.target.value)}
      ></input>

      {branch
        .filter((item) => {
          if (query === "") {
            return item;
          } else if (item.city.toLowerCase().includes(query.toLowerCase())) {
            return item;
          }
        })
        .map((item, index) => (
          <div key={item.id} className="branch-card">
            <b>City:</b> {item.city}
            <br></br>
            <b>Address:</b> {item.address}
            <br></br>
            <b>Telephone:</b> {item.telephone}
            <br></br>
            <b>Fax:</b> {item.fax}
            <br></br>
            <b>Email:</b> {item.email}
            <br></br>
            <b>All Services:</b> {item.allservices}
            <br></br>
            <b>Visa Department:</b> {item.visadepartment}
            <br></br>
          </div>
        ))}

      {/* {branch
        ? branch.map((item) => {
            return (
              <div key={item.id} className="branch-card">
                <b>City:</b> {item.city}
                <br></br>
                <b>Address:</b> {item.address}
                <br></br>
                <b>Telephone:</b> {item.telephone}
                <br></br>
                <b>Fax:</b> {item.fax}
                <br></br>
                <b>Email:</b> {item.email}
                <br></br>
                <b>All Services:</b> {item.allservices}
                <br></br>
                <b>Visa Department:</b> {item.visadepartment}
                <br></br>
              </div>
            );
          })
        : "Unauthorized"} */}
    </div>
  );
};

export default Branches;
