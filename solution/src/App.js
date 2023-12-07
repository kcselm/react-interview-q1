import { useEffect, useState } from "react";
import "./App.css";
import { getLocations, isNameValid } from "./mock-api/apis";

function App() {
  const [formValues, setFormValues] = useState({
    id: 1,
    name: "",
    location: "",
  });
  const [validName, setValidName] = useState(true);
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

  const clearEntries = () => {
    setRecords([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validName = await isNameValid(formValues.name);
    if (validName) {
      setValidName(true);
      setRecords([...records, formValues]);
      setFormValues({ id: formValues.id + 1, name: "", location: "" });
    } else {
      setValidName(false);
    }
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
        {validName || <div className="error">That's an invalid name</div>}
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
        <br />
        <div className="buttons">
          <button onClick={clearEntries}>Clear</button>
          <button type="submit">Add</button>
        </div>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>Name </th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
