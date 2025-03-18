import { FC, useEffect, useState } from "react";
import axios from "axios";

interface Props {
  title: string;
}

interface Users {
  name: {
    first: string;
    last: string;
  };

  login: {
    uuid: string;
  };

  email: string;
}

const App: FC<Props> = ({ title }) => {
  const [users, setUsers] = useState<Users[]>([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/?results=10");

      console.log(data);
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {users.map(({ name, login, email }) => {
          return (
            <li key={login.uuid}>
              <div>
                Name: {name.first} {name.last}
              </div>

              <div>Email: {email}</div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
