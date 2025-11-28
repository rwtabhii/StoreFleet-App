import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function ErrorPage() {
    const navigate = useNavigate()
  const error = useRouteError();
  console.log(error);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
         <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "1rem",
        }}
      >
        Go Home
      </button>
    </div>
  );
}
