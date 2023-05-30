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
  uid: string;
}

const Leaderboard = () => {
  const [rows, setRows] = useState<Array<LeaderboardData>>([]);
  const sortedRows = [...rows].sort((a, b) => a.score - b.score);

  useEffect(() => {
    async function getData() {
      const db = getFirestore(app);
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);

      const newRows: Array<object> = [];

      // querySnapshot.forEach(async (userDoc) => {
      //   const scoresCollectionRef = collection(userDoc.ref, "scores");
      //   const scoresQuerySnapshot = await getDocs(scoresCollectionRef);

      //   scoresQuerySnapshot.forEach((scoreDoc) => {
      //     const score = scoreDoc.data();
      //     newRows.push(score);
      //   });
      // });
      // setRows(newRows as LeaderboardData[]);
      await Promise.all(
        querySnapshot.docs.map(async (userDoc) => {
          const scoresCollectionRef = collection(userDoc.ref, "scores");
          const scoresQuerySnapshot = await getDocs(scoresCollectionRef);

          scoresQuerySnapshot.forEach((scoreDoc) => {
            const score = scoreDoc.data();
            newRows.push(score);
          });
        })
      );

      setRows(newRows as LeaderboardData[]);
    }
    getData();
  }, []);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>

      <label htmlFor="map">Select Map</label>
      <select name="map" id="mapSelect">
        <option value="all">All</option>
        {/* <option value="map1">Map #1</option>
        <option value="map2">Map #2</option>
        <option value="map3">Map #3</option> */}
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
        <tbody className="leaderboardData">
          {sortedRows.map((row) => {
            const uidPrefix = row.uid.slice(0, 2);
            const modifiedName = row.name + uidPrefix;
            return (
              <tr key={uniqid()}>
                <td>{modifiedName}</td>
                <td>{row.date}</td>
                <td>{row.map}</td>
                <td>{row.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
