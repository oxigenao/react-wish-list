import { UserData } from "../../../../hooks/userData/userData";
import React, { useEffect } from "react";

function SharedPeople(props: { users: UserData[] }) {
  useEffect(() => {
    console.log(props.users);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "15px",
      }}
    >
      {props.users.map((user) => {
        return (
          <div
            style={{
              display: "flex",
              width: "30px",
              height: "30px",
              border: "2px solid black",
              marginLeft: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ margin: 0 }}>{user.name.substr(0, 1)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SharedPeople;
