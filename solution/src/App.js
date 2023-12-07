import { useState } from "react";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    id: 1,
    name: "",
    location: "",
  });
  const [records, setRecords] = useState([]);

  const handleNameChange = (e) => {
    setFormValues({ ...formValues, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords([...records, formValues]);
    setFormValues({ id: formValues.id + 1, name: "", location: "" });
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={formValues.name}
          onChange={handleNameChange}
        ></input>
      </form>
    </div>
  );
}

export default App;
