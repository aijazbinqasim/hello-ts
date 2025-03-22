import { FC, useState } from "react";
import axios from "axios";
import { AppProps, Users } from "./app.types";
import User from "./components/User";

const App: FC<AppProps> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://randomuser.me/api/?results=10");
      setUsers(data.results);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Load Users</button>
      <br />
      <input type="text" onChange={handleChange} />
      <p>{username}</p>
      {isLoading && <p>Loading...</p>}
      <ul>
        {users.map(({ name, login, email }) => {
          return <User key={login.uuid} name={name} email={email} />;
        })}
      </ul>
    </div>
  );
};

export default App;
