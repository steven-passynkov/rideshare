import {
  Navbar,
  Button,
  Link,
  Text,
  Modal,
  Input,
  Row,
  Checkbox,
} from "@nextui-org/react";
import React from "react";

import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";

function Header() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

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
        <Button auto shadow onPress={handler}>
          Open modal
        </Button>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Sign Up
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="#59A160"
              size="lg"
              placeholder="Name"
              contentLeft={<BsFillPersonFill fill="currentColor" />}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="#59A160"
              size="lg"
              placeholder="Last name"
              contentLeft={<BsPerson fill="currentColor" />}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="#59A160"
              size="lg"
              placeholder="Email"
              contentLeft={<AiOutlineMail fill="currentColor" />}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              animated
              shadow
              css={{
                color: "#FFFFFF",
                bg: "#02852E",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                "&:hover": {
                  opacity: "0.6",
                },
              }}
              onPress={closeHandler}
            >
              Close
            </Button>
            <Button
              flat
              animated
              auto
              shadow
              css={{
                color: "#02852E",
                bg: "rgba(255, 255, 255, 0.8)",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                "&:hover": {
                  opacity: "0.6",
                },
              }}
              onPress={closeHandler}
            >
              Sign in
            </Button>
          </Modal.Footer>
        </Modal>{" "}
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
