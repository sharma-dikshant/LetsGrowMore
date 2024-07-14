import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [empData, setEmpData] = useState([]);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch(`https://reqres.in/api/users?page=${curPage}`);
      if (!res.ok) return;
      const data = await res.json();
      setEmpData(data.data);
    }
    if (isShowDetails) fetchDetails();
  }, [curPage, isShowDetails]);

  function handleShowDetails() {
    setIsShowDetails(!isShowDetails);
  }

  return (
    <div className="App">
      <Header />
      <NavBar onChangeShowDetails={handleShowDetails} isShowDetails={isShowDetails} />
      {isShowDetails ? (
        <>
          <EmpDetails empData={empData} />
          <PageNo curPage={curPage} setCurPage={setCurPage} />
        </>
      ) : null}
    </div>
  );
}

function Header() {
  return <header>Let's Grow More</header>;
}

function NavBar({ onChangeShowDetails, isShowDetails }) {
  return (
    <div className="NavBar">
      <button onClick={onChangeShowDetails}>
        {!isShowDetails ? "GET EMPLOYEES DETAILS" : "HIDE"}
      </button>
    </div>
  );
}

function EmpDetails({ empData }) {
  return (
    <div className="EmpDetails">
      {empData.map((emp) => (
        <Employee key={emp.id} employee={emp} />
      ))}
    </div>
  );
}

function Employee({ employee }) {
  return (
    <div className="Employee">
      <div>
        <img src={employee.avatar} alt={`${employee.first_name} ${employee.last_name}`} />
      </div>
      <div>
        <h2>{employee.first_name + " " + employee.last_name}</h2>
        <h3>ID: {employee.id}</h3>
        <h3>Email: {employee.email}</h3>
      </div>
    </div>
  );
}

function PageNo({ curPage, setCurPage }) {
  function handlePageUpdate(pageNo) {
    setCurPage(Number(pageNo));
  }

  return (
    <footer>
      <button value={1} onClick={(e) => handlePageUpdate(e.target.value)}>1</button>
      <button value={2} onClick={(e) => handlePageUpdate(e.target.value)}>2</button>
    </footer>
  );
}

export default App;
