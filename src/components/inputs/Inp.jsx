import React from "react";

export const Inp = () => {
  const [number, setNumber] = React.useState(null);

  return (
    <div>
      <input type="number" onChange={(e) => setNumber(e.target.value)} />
    </div>
  );
};
