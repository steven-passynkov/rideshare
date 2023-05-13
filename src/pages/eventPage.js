import {
  Grid,
  Card,
  Text,
  Container,
  Button,
  Spacer,
  Avatar,
} from "@nextui-org/react";
import Router from "next/router";
import EventCard from "@/components/card";
import { AiOutlineHome } from "react-icons/ai";

function eventPage() {
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
        Find RideShares
      </Text>

      <Spacer y={4} />

      <Grid.Container gap={2} alignItems="center" justify="center">
        <EventCard
          img={
            "https://d1.awsstatic.com/i-pHDD8bP-X2.78f042801854f6eafbe76d6ded04f07f15ecdfd7.jpeg"
          }
          title={"Amazon Dev Convention"}
        />
        <EventCard
          img={
            "https://i.cbc.ca/1.6821289.1682399360!/cpImage/httpImage/maple-leafs-24042023.jpg"
          }
          title={"Leafs Game"}
        />

        <EventCard
          img={
            "https://i.cbc.ca/1.6218940.1634774921!/cumulusImage/httpImage/image.jpg_gen/derivatives/4x3_1180/toronto-raptors-home-opener.jpg"
          }
          title={"Toronto Raptors game"}
        />

        <EventCard
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnEaYFcLYmSDyqKEKQuUILLIjfLCvTGGzTQ&usqp=CAU"
          }
          title={"Concert Toronto"}
        />

        <EventCard
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNJCxEDMQyN2FLUbwel8W5MxVbwGXP1DpdQ&usqp=CAU"
          }
          title={"Beaches"}
        />
      </Grid.Container>
    </Container>
  );
}

export default eventPage;
