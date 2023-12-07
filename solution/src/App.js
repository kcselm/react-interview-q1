import { useEffect, useState } from "react";
import "./App.css";
import { getLocations } from "./mock-api/apis";

function App() {
  const [formValues, setFormValues] = useState({
    id: 1,
    name: "",
    location: "",
  });
  const [records, setRecords] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const handleNameChange = (e) => {
    setFormValues({ ...formValues, name: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormValues({ ...formValues, location: e.target.value });
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
        <br />
        <label htmlFor="location">Location </label>
        <select name="location" onChange={handleLocationChange}>
          <option defaultValue=""></option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <br />
        <button>Clear</button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
