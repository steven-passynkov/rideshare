import {
  Navbar,
  Button,
  Link,
  Text,
  Modal,
  Input,
  Row,
  Checkbox,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { useSignout } from "@/hooks/useSignout";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import Router from "next/router";
import Images from "next/image"
import Logo from "../../public/logo.png"

function Header() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const loginhandler = () => setLogin(false);
  const signuphandler = () => setSignup(false);
  const { session } = useContext(UserContext);

  const [shouldSignout, setShouldSignout] = useState(false);

  const { error } = useSignout(shouldSignout);

  const [variant, setVariant] = useState("static");

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

  function findRide() {
    if (session) {
      Router.push("./events");
    } else {
      setSignup(true);
    }
  }

  function redirectProfile() {
    Router.push("./profile");
  }

  function redirectVolunteer() {
    if (session) {
      Router.push("./volunteer");
    } else {
      setSignup(true);
    }
  }

  function logout() {
    alert("hello");
    setShouldSignout(true);
  }

  return (
    <Navbar isBordered variant={variant}>
      <Navbar.Brand
       
      >
        <Images src={Logo} height={200} />
      </Navbar.Brand>
      <Navbar.Content hideIn={"xs"}>
        <Navbar.Link href="#aboutus">About Us</Navbar.Link>
        <Navbar.Link href="#problem">The Problem</Navbar.Link>

        <Login
          open={login}
          closeHandler={loginhandler}
          signUpRedirect={setSignup}
        />
        <Signup
          open={signup}
          closeHandler={signuphandler}
          loginredirect={setLogin}
        />
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link
          css={{ color: "#105948" }}
          onClick={() => redirectVolunteer()}
        >
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
            onPress={() => findRide()}
          >
            Find Ride
          </Button>
        </Navbar.Item>
        {session ? (
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <Avatar
                bordered
                size="lg"
                as="button"
                
                css={{color: "#02852E"}}
                src={`https://zyyhrcdinczrzawuvnjs.supabase.co/storage/v1/object/public/images/${session.user.user_metadata.profile_picture}`}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
              <Dropdown.Item
                href="./profile"
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",
                  height: "$18",
                  color: "#000000",

                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
              >
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {session.user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item
                key="settings"
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",
                  color: "#000000",


                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
                withDivider
              >
                <Link
                  css={{
                    outline: "none",
                    borderWidth: "0",
                    color: "#000000",
                    "&:hover": {
                      color: "#02852E",
                    },
                  }}
                  href="./profile"
                >
                  My Events
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onPress={() => redirectProfile()}
                key="team_settings"
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",
                  color: "#000000",

                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
              >
                <Link
                  css={{
                    outline: "none",
                    borderWidth: "0",
                    color: "#000000",
                    "&:hover": {
                      color: "#02852E",
                    },
                  }}
                  href="./profile"
                >
                  Volunteering
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                onPress={() => redirectProfile()}
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",
                  color: "#000000",

                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
                key="analytics"
              >
                <Link
                  css={{
                    outline: "none",
                    borderWidth: "0",
                    color: "#000000",
                    "&:hover": {
                      color: "#02852E",
                    },
                  }}
                  href="./profile"
                >
                  My Profile
                </Link>{" "}
              </Dropdown.Item>

              <Dropdown.Item
                onPress={() => redirectProfile()}
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",
                  color: "#000000",

                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
                key="help_and_feedback"
                withDivider
              >
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item
                css={{
                  background: "none",
                  outline: "none",
                  borderBlock: "none",
                  borderWidth: "0",

                  "&:hover": {
                    background: "none",
                    outline: "none",
                    borderBlock: "none",
                    borderWidth: "0",
                    color: "#02852E",
                  },
                }}
              >
                <Button
                  css={{
                    color: "#02852E",
                    bg: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    "&:hover": {
                      opacity: 0.8,
                      outline: "none",
                      borderBlock: "none",
                      borderWidth: "0",
                    },
                  }}
                  onPress={() => logout()}
                >
                  Log Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          ""
        )}
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
