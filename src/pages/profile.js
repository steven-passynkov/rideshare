import {
  Grid,
  Card,
  Text,
  Container,
  Col,
  Row,
  Button,
  Spacer,
} from "@nextui-org/react";
import Router from "next/router";
import { AiOutlineHome } from "react-icons/ai";


function Profile() {

    function redirectHome() {
        Router.push("./");
      }


  return (
    <Container justify="center" alignItems="center">
      <Spacer y={3} />
      <Button
        onClick={redirectHome}
        auto
        ghost
        shadow
        rounded
        color="#02852E"
        icon={
          <AiOutlineHome
            fill="#02852E"
            filled
            css={{
              "&:hover": {
                color: "white",
              },
            }}
          />
        }
        css={{
          color: "#02852E",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      >
        Back Home
      </Button>
      <Text
        h1
        alignItems="center"
        justify="center"
        css={{
          textGradient: "45deg, $green900 -20%, $green800 50%",
          m: 0,
          textAlign: "center",
        }}
      >
        My Profile
      </Text>

      <Button>
        Attending Events
    </Button>

    <Button>
        My Volunteering
    </Button>

    </Container>
  );
}

export default Profile