import { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { HiIdentification } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [active, setActive] = useState("");
  const fetchUser = async () => {
    const res = await fetch("https://randomuser.me/api/");
    const userData = await res.json();
    let user;
    if (userData?.results) {
      user = userData.results[0];
    } else {
      setError(userData?.error);
    }

    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const { location, picture } = user;

  return (
    <div className="App">
      {error ? (
        <div>{error}</div>
      ) : (
        <>
          <h2 className="head">
            {user?.name?.title} {user?.name?.first} {user?.name?.first}
          </h2>
          <div className="main">
            <div className="image">
              <img src={picture?.large} alt={user?.name?.first} width="300px" />
            </div>
            <address className="address">
              {user?.location?.street?.number}, {location?.street?.name},{" "}
              {location?.city}
            </address>
            <div>
              <p className="data-display">
                {active === "dob"
                  ? new Date(user?.dob?.date).toLocaleDateString()
                  : active === "phone"
                  ? user?.phone
                  : active === "email"
                  ? user?.email
                  : active === "id"
                  ? user?.id?.value
                  : ""}
              </p>
              <ul className="data">
                <li
                  className={active === "phone" && "active"}
                  onMouseEnter={() => setActive("phone")}
                  onMouseLeave={() => setActive("")}
                >
                  <BsTelephoneFill />
                </li>
                <li
                  className={active === "email" && "active"}
                  onMouseEnter={() => setActive("email")}
                  onMouseLeave={() => setActive("")}
                >
                  <MdEmail />
                </li>
                <li
                  className={active === "dob" && "active"}
                  onMouseEnter={() => setActive("dob")}
                  onMouseLeave={() => setActive("")}
                >
                  <BsFillCalendarDateFill />
                </li>
                <li
                  className={active === "id" && "active"}
                  onMouseEnter={() => setActive("id")}
                  onMouseLeave={() => setActive("")}
                >
                  <HiIdentification />
                </li>
              </ul>
            </div>
          </div>

          <div className="randomize">
            <button onClick={fetchUser} className="btn">
              Randomize
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
