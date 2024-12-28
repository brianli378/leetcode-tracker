export const getProblems = () => {
    return JSON.parse(sessionStorage.getItem("problems")) || [];
  };
  
  export const saveProblems = (problems) => {
    sessionStorage.setItem("problems", JSON.stringify(problems));
  };
  