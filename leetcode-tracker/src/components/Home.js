import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const storedProblems = JSON.parse(localStorage.getItem("problems")) || [];
    setProblems(storedProblems);
    console.log("Loaded problems from localStorage:", storedProblems);
  }, []);

  const addProblem = () => {
    const newProblem = { id: Date.now(), name: "New Problem", code: "", explanation: "" };
    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);

    localStorage.setItem("problems", JSON.stringify(updatedProblems));
    console.log("Added problem:", newProblem);
    console.log("Updated problems in localStorage:", JSON.parse(localStorage.getItem("problems")));
  };

  const deleteProblem = (id) => {
    const updatedProblems = problems.filter((problem) => problem.id !== id);
    setProblems(updatedProblems);

    localStorage.setItem("problems", JSON.stringify(updatedProblems));
    console.log("Deleted problem with id:", id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LeetCode Tracker</h1>
      <button
        onClick={addProblem}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        + Add Problem
      </button>
      <ul className="space-y-2">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <Link to={`/problem/${problem.id}`} className="text-blue-500">
              {problem.name}
            </Link>
            <button
              onClick={() => deleteProblem(problem.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
