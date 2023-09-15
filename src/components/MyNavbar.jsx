import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

function MyNavbar() {
  const location = useLocation();
  return (
    <>
      <Navbar data-bs-theme="light" className="mb-5" style={{ backgroundColor: "#CCD0D5" }}>
        <Container>
          <Navbar.Brand>
            <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/">
              <img
                src="https://m.media-amazon.com/images/I/61nuuPxUvaL.png"
                alt="meteo-logo"
                style={{ width: "50px" }}
              />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className={`nav-link ${location.pathname === "/" && "active"}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname === "/Contacts" && "active"}`} to="/Contacts">
              Contacts
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
