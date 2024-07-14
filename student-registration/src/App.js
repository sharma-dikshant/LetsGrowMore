import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

export default function App() {
  const [students, setStudents] = useState([]);

  function handleAddStudent(newStudent) {
    setStudents((students) => [...students, newStudent]);
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Form onAddStudent={handleAddStudent} />
        <List students={students} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Sample</h1>
      <h2>Student Enrollment Form</h2>
    </header>
  );
}

function Form({ onAddStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState({
    ReactJs: false,
    NodeJs: false,
    firebase: false,
    MongoDB: false,
    php: false,
    git: false,
  });

  function handleChange(evt) {
    const { name, checked } = evt.target;
    setSkills((prevSkills) => ({ ...prevSkills, [name]: checked }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (
      !name ||
      !email ||
      !website ||
      !gender ||
      !Object.values(skills).includes(true)
    ) {
      alert("Enter the complete details");
      return;
    }

    const selectedSkills = Object.keys(skills).filter((skill) => skills[skill]);

    const newStudent = {
      id: Date.now(),
      name,
      email,
      website,
      image,
      gender,
      skills: selectedSkills,
    };

    // clearing input fields
    onAddStudent(newStudent);
    setName("");
    setEmail("");
    setWebsite("");
    setImage("");
    setGender("Male");
    setSkills({
      ReactJs: false,
      NodeJs: false,
      firebase: false,
      MongoDB: false,
      php: false,
      git: false,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Website</label>
        <input
          type="text"
          placeholder="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <label>Image Link</label>
        <input
          type="text"
          placeholder="image link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label>Skills</label>
        <div className="skills">
          <span>
            <input
              type="checkbox"
              name="ReactJs"
              checked={skills.ReactJs}
              onChange={handleChange}
            />
            <label>ReactJs</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="NodeJs"
              checked={skills.NodeJs}
              onChange={handleChange}
            />
            <label>NodeJs</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="firebase"
              checked={skills.firebase}
              onChange={handleChange}
            />
            <label>firebase</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="MongoDB"
              checked={skills.MongoDB}
              onChange={handleChange}
            />
            <label>MongoDB</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="php"
              checked={skills.php}
              onChange={handleChange}
            />
            <label>php</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="git"
              checked={skills.git}
              onChange={handleChange}
            />
            <label>git</label>
          </span>
        </div>
        <div>
          <button type="submit">
            <FontAwesomeIcon icon={faUserPlus} />
            Enroll Student
          </button>
          <button
            className="clear"
            onClick={(evt) => {
              evt.preventDefault();
              setName("");
              setEmail("");
              setWebsite("");
              setSkills({
                ReactJs: false,
                NodeJs: false,
                firebase: false,
                MongoDB: false,
                php: false,
                git: false,
              });
              setImage("");
              setGender("Male");
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
            Clear
          </button>
        </div>
      </form>
    </>
  );
}

function List({ students }) {
  return (
    <div className="enrolled-students">
      <ul>
        {students.map((student) => (
          <Student key={student.id} student={student} />
        ))}
      </ul>
    </div>
  );
}

function Student({ student }) {
  return (
    <li className="enrolled-student">
      <div>
        <h3>Description</h3>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p>
          <strong>Website:</strong> <a href={student.website}>{student.website}</a>
        </p>
        <p><strong>Skills:</strong> {student.skills.join(", ")}</p>
      </div>
      <div>
        <h3>Image</h3>
        {student.image ? (
          <img src={student.image} alt={`${student.name}'s profile`} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
    </li>
  );
}
