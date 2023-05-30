import React, { useEffect, useState } from "react";
import "../Styles/Leaderboard.css";
import {
  getAuth,
  onAuthStateChanged,
  collection,
  getDocs,
  getFirestore,
  app,
} from "../Firebase";
import uniqid from "uniqid";

interface LeaderboardData {
  name: string;
  map: string;
  score: number;
  date: string;
}

const Leaderboard = () => {
  const [rows, setRows] = useState<JSX.Element[]>([]);

  const displayLeaderboardData = (data: LeaderboardData) => {
    return (
      <tr key={uniqid()}>
        <td>{data.name}</td>
        <td>{data.date}</td>
        <td>{data.map}</td>
        <td>{data.score}</td>
      </tr>
    );
  };

  useEffect(() => {
    async function getData() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
        }
      });
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, "users"));

      const rowsData = querySnapshot.docs.map((doc) => {
        const newData = doc.data() as LeaderboardData;
        return displayLeaderboardData(newData);
      });

      setRows(rowsData);
    }
    getData();
  }, []);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>

      <label htmlFor="map">Select Map</label>
      <select name="map" id="mapSelect">
        <option value="all">All</option>
        <option value="map1">Map #1</option>
        <option value="map2">Map #2</option>
        <option value="map3">Map #3</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Map</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
