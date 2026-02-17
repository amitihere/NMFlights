import { useState } from "react";

function BottomInputs() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const handleSubmit = () => {
    alert("Form Submitted 🚀");
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Flight Search</h2>

      <div style={inputWrapper}>
        <input
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter the country name"
          style={inputStyle}
        />
      </div>

      {input1 !== "" && (
        <div style={{ ...inputWrapper, ...fadeIn }}>
          <input
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter the Airlines"
            style={inputStyle}
          />
        </div>
      )}

      {input2 !== "" && (
        <div style={{ ...inputWrapper, ...fadeIn }}>
          <input
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            placeholder="Search the flight by destination - arrival"
            style={inputStyle}
          />
        </div>
      )}

      {input3 !== "" && (
        <button style={submitStyle} onClick={handleSubmit}>
          Search Flight
        </button>
      )}
    </div>
  );
}

export default BottomInputs;

const containerStyle = {
  width: "90%",
  maxWidth: "600px",
  margin: "40px auto",
  padding: "30px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  transition: "all 0.3s ease",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "10px",
  fontWeight: "600",
  letterSpacing: "1px",
  color: "#333",
};

const inputWrapper = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "14px 16px",
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  transition: "all 0.3s ease",
};

const submitStyle = {
  padding: "14px",
  fontSize: "16px",
  fontWeight: "600",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #e09d46, #f5981d)",
  color: "#fff",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const fadeIn = {
  animation: "fadeIn 0.4s ease forwards",
};
