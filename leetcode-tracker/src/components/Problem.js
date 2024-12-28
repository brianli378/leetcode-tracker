import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [editingCode, setEditingCode] = useState(false);

  useEffect(() => {
    const storedProblems = JSON.parse(localStorage.getItem("problems")) || [];
    const currentProblem = storedProblems.find((p) => p.id === Number(id));
    if (currentProblem) {
      setProblem(currentProblem);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const saveProblem = (updatedProblem) => {
    const storedProblems = JSON.parse(localStorage.getItem("problems")) || [];
    const updatedProblems = storedProblems.map((p) =>
      p.id === updatedProblem.id ? updatedProblem : p
    );
    localStorage.setItem("problems", JSON.stringify(updatedProblems));
  };

  useEffect(() => {
    if (problem) {
      saveProblem(problem);
    }
  }, [problem]);

  const updateField = (field, value) => {
    setProblem({ ...problem, [field]: value });
  };

  const handleBack = () => {
    if (problem) {
      saveProblem(problem);
    }
    navigate("/");
  };

  const toggleEditingCode = () => setEditingCode(!editingCode);

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <button
        onClick={handleBack}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to Home
      </button>

      <input
        className="w-full p-2 border mb-4"
        value={problem.name}
        onChange={(e) => updateField("name", e.target.value)}
        placeholder="Problem Name"
      />

      {}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Code</h2>
          <button
            onClick={toggleEditingCode}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            {editingCode ? "View Code" : "Edit Code"}
          </button>
        </div>

        {editingCode ? (
          <textarea
            className="w-full p-2 border"
            rows="10"
            value={problem.code}
            onChange={(e) => updateField("code", e.target.value)}
          ></textarea>
        ) : (
          <SyntaxHighlighter
            language="javascript"
            style={docco}
            className="border rounded p-2"
          >
            {problem.code || "// No code provided yet."}
          </SyntaxHighlighter>
        )}
      </div>

      <textarea
        className="w-full p-2 border mb-4"
        rows="5"
        value={problem.explanation}
        onChange={(e) => updateField("explanation", e.target.value)}
        placeholder="Add your explanation here"
      ></textarea>
    </div>
  );
}

export default Problem;
