import React, { useEffect } from "react";
import "../Styles/Leaderboard.css";
// import { getFirestore, collection, addDoc, app } from "../Firebase";

const Leaderboard = () => {
  //   const db = getFirestore(app);
  //   const test = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  //   useEffect(() => {
  //     test();
  //   }, []);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>

      <label htmlFor="map">Select Map</label>
      <select name="map" id="mapSelect">
        <option value="map1">Map #1</option>
        <option value="map2">Map #2</option>
        <option value="map3">Map #3</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stephen Curry</td>
            <td>02/25</td>
            <td>1:21</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>04/21</td>
            <td>2:01</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
