import { FC, useEffect, useState } from "react";
import axios from "axios";
import { AppProps, Users } from "./app.types";
import User from "./components/User";

const App: FC<AppProps> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://randomuser.me/api/?results=10");
      setUsers(data.results);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
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
