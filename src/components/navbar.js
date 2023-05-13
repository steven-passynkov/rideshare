import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import React from "react";

function Header() {
  const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];

  return (
    <Navbar isBordered variant={variant}>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          RideShare
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="#">About Us</Navbar.Link>
        <Navbar.Link isActive href="#">
          The Problem
        </Navbar.Link>
        <Navbar.Link href="#">Events</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Volunteer
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Find Ride
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default Header;
