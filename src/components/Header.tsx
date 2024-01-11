import { Nav, Navbar, Container } from "react-bootstrap"
import { Github } from "react-bootstrap-icons"
import Config from "../Config"

function Header() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Nav>
          <Navbar.Brand>
            <a href="https://www.tezos.com" target="_blank">
              <img
                src="/tezos.svg"
                className="d-inline-block align-top"
                width="30"
                height="30"
                alt="Tezos Logo"
              />
            </a>{" "}
            {Config.application.name}
          </Navbar.Brand>
        </Nav>
        <Nav>
          <Nav.Link href={Config.application.githubRepo} target="_blank">
            <Github />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
