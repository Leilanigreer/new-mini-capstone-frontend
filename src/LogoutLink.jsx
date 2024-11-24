import apiClient from "./config/axios";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete apiClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <a href="/" onClick={handleClick}>
      Logout
    </a>
  );
}