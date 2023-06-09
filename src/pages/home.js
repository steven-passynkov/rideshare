import React, { useEffect, useState } from "react";
import Images from "next/image";
import Aos from "aos";
import car from "../../public/car.jpg";
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
import "aos/dist/aos.css";
import  {useContext}  from "react";
import { UserContext } from "@/contexts/UserContext";
import Login from "@/components/login";
import Signup from "@/components/signup";

function Home() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const loginhandler = () => setLogin(false);
  const signuphandler = () => setSignup(false);

  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("Reduce the emission of CO2");
  const [index, setIndex] = useState(0);
  const { session } = useContext(UserContext);

  function redirectEvents() {

    if (session) {
      Router.push("./events");
    } else {
      setSignup(true);
    }
  }
  useEffect(() => {
    Aos.init();
  }, []);

  function redirectVolunteer() {
    if (session) {
      Router.push("./volunteer");
    } else {
      setSignup(true);
    }
  }

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 10);
    }
  }, [index]);

  return (
    <Container justify="center" alignItems="center">
       <Login open={login} closeHandler={loginhandler} signUpRedirect={setSignup} />
        <Signup open={signup} closeHandler={signuphandler} loginredirect={setLogin} />
      <Spacer y={3} />

      <Grid.Container justify="center" alignItems="center">
        <Grid>
          <h1>{text}</h1>
          <h3>With RideShare</h3>
        </Grid>
        <Spacer x={4} />
        <Grid>
          <Images
            showSkeleton
            width={500}
            height={500}
            src={car}
            alt="Default Image"
          />
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Grid.Container justify="space-evenly" alignItems="center" gap={2}>
        <Grid>
          <Card data-aos="fade-right" css={{ w: "100%", h: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#1FA153"
                >
                  Lower Gas Emission
                </Text>
                <Text
                  h3
                  transform="uppercase"
                  weight="bold"
                  color="black"
                  css={{
                    textGradient: "45deg, $green900 -20%, $green800 50%",
                    m: 0,
                  }}
                >
                  Attending an event? Find a ride!
                </Text>
              </Col>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src="https://shorturl.at/nLQ59"
                objectFit="cover"
                width="80%"
                height="80%"
                alt="Card image background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bg: "#ffffff",
                // bgBlur: "#ffffff01",
                borderTop: "$borderWeights$light solid $gray800",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Text color="#1FA153" size={12} weight="bold">
                        RideShare
                      </Text>
                      <Text color="#fffffff" size={12} weight="bold">
                        Help the enviroment. Find A Ride.
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      onClick={redirectEvents}
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
                    >
                      <Text
                        css={{ color: "green900" }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Find A Ride
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid>
          <Card data-aos="fade-left" css={{ w: "100%", h: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight="bold"
                  transform="uppercase"
                  color="#D3D3D3"
                >
                  Lower Gas Emission
                </Text>
                <Text
                  h3
                  transform="uppercase"
                  weight="bold"
                  color="black"
                  css={{
                    textGradient: "45deg, $green500 -20%, $green800 50%",
                    m: 0,
                  }}
                >
                  Attending an event? Give a ride!
                </Text>
              </Col>
            </Card.Header>
            <Card.Divider />

            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src="https://img.freepik.com/free-vector/illustration-human-avatar-with-environment_53876-17604.jpg?size=626&ext=jpg&ga=GA1.1.1741040153.1681392539&semt=robertav1_2_sidr"
                objectFit="cover"
                width="58%"
                height="58%"
                alt="Card image background"
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bg: "#ffffff",
                //  bgBlur: "#d3d3d300",
                borderTop: "$borderWeights$light solid $gray800",
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Text color="#1FA153" size={12} weight="bold">
                        RideShare
                      </Text>
                      <Text color="#fffffff" size={12} weight="bold">
                        Help the enviroment. Volunteer Your ride.
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row justify="flex-end">
                    <Button
                      animated
                      flat
                      auto
                      rounded
                      onClick={redirectVolunteer}
                      shadow
                      css={{
                        color: "#02852E",
                        bg: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                      }}
                    >
                      <Text
                        css={{ color: "green900" }}
                        size={12}
                        weight="bold"
                        transform="uppercase"
                      >
                        Volunteer Ride
                      </Text>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Card css={{ w: "100%", h: "100%" }} data-aos="fade-up" id="problem">
        <Grid.Container alignItems="center" justify="flex-start">
          <Grid xs={18} alignItems="center" justify="left" direction="column">
            <Spacer x={2} />
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              1.4 billion
            </Text>
            <Spacer x={2} />
            <Text
              h5
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                top: 0,
              }}
            >
              tons of greenhouse gases released into the atmosphere each year by
              highway vehicles
            </Text>
          </Grid>

          <Grid xs={18} alignItems="center" justify="left" direction="column">
            <Spacer x={2} />
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              4.8 metric tons
            </Text>
            <Spacer x={2} />
            <Text
              h5
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                top: 0,
              }}
            >
              of carbon dioxide released into the atmosphere by a vehicle
              annualy
            </Text>
          </Grid>
          <Grid xs={18} alignItems="center" justify="left" direction="column">
            <Spacer x={2} />
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              1 degree
            </Text>
            <Spacer x={2} />
            <Text
              h5
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                top: 0,
              }}
            >
              increase in global temperature
            </Text>
          </Grid>
          <Grid xs={18} alignItems="center" justify="left" direction="column">
            <Spacer x={2} />
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              25%
            </Text>
            <Spacer x={2} />
            <Text
              h5
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                top: 0,
              }}
            >
              rise of concentration of Carbon Dioxide in the atmosphere since
              industrial revlution
            </Text>
          </Grid>
          <Grid xs={18} alignItems="center" justify="left" direction="column">
            <Spacer x={2} />
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              2 degrees
            </Text>
            <Spacer x={2} />
            <Text
              h5
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                top: 0,
              }}
            >
              potential rise of global temperature by the end of the century
            </Text>
            <Spacer x={2} />
          </Grid>
        </Grid.Container>
      </Card>

      <Spacer y={2} />
      <Grid.Container gap={2} justify="center">
        <Grid xs={6}>
      <Card  data-aos="fade-down" id="aboutus">
        <Card.Header>
          <Row alignItems="center" justify="center">
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              How RideShare Helps
            </Text>
          </Row>
        </Card.Header>
        <Card.Body>
          <Col alignItems="center" justify="center">
              <Text>Ride Share allows people to share rides when attending events. Instead driving to an event indiviudally, users can share their rides, decreasing their carbon emission by a huge factor</Text>
          </Col>
        </Card.Body>
      </Card>
      </Grid>
      <Grid xs={6}>
      <Card data-aos="fade-down" id="aboutus">
        <Card.Header>
          <Row alignItems="center" justify="center">
            <Text
              h2
              transform="uppercase"
              weight="bold"
              color="black"
              css={{
                textGradient: "45deg, $green900 -20%, $green800 50%",
                m: 0,
              }}
            >
              How RideShare Works
            </Text>
          </Row>
        </Card.Header>
        <Card.Body>
          <Col alignItems="center" justify="center">
              <Text>Planning on attending an event? Be a volunteer. Pick up others and drive together to the event your are attending. Want to reduce 
                Carbon Emission when attending an event? Join a ride.
              </Text>
          </Col>
        </Card.Body>
      </Card>
      </Grid>
      </Grid.Container>
      <Spacer y={2} />
    </Container>
  );
}

export default Home;
