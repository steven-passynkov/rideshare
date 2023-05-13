import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Dropdown,
  Avatar,
  Collapse,
} from "@nextui-org/react";
import React from "react";

function Header() {
  const [variant, setVariant] = React.useState("static");

  const variants = ["static", "floating", "sticky"];
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar isBordered variant={variant}>
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Text b color="inherit">
          RideShare
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn={"xs"}>
        <Navbar.Link href="#aboutus">About Us</Navbar.Link>
        <Navbar.Link href="#problem">The Problem</Navbar.Link>
        <Navbar.Link href="#">Events</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link css={{ color: "#105948" }} href="./volunteer">
          Volunteer
        </Navbar.Link>
        <Navbar.Item>
          <Button
            flat
            animated
            auto
            shadow
            rounded
            css={{
              color: "#02852E",
              bg: "rgba(255, 255, 255, 0.8)",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            }}
            as={Link}
            href="./events"
          >
            Find Ride
          </Button>
        </Navbar.Item>
      </Navbar.Content>

      <Navbar.Collapse disableAnimation>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="warning"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            sActive={index === 2}
          >
            <Link
              color="inherit
                "
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
