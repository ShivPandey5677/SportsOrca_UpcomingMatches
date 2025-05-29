import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchCard = ({ homeTeam, awayTeam, date }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300 ease-in-out">
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        {homeTeam} <span className="text-blue-500">vs</span> {awayTeam}
      </h2>
      <p className="text-gray-500 text-sm">
        📅 {new Date(date).toLocaleDateString()} <br />
        🕒 {new Date(date).toLocaleTimeString()}
      </p>
    </div>
  );
};

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/matches");
        setMatches(response.data);
      } catch (err) {
        setError("Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        ⚽ Upcoming Soccer Matches
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              date={match.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
