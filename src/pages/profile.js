import {
  Grid,
  Card,
  Text,
  Container,
  Col,
  Row,
  Button,
  Spacer,
  Avatar,
  TextField,
  Input,
} from "@nextui-org/react";
import Router from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useFetchEvent } from "@/hooks/useFetchEvent";
import { useFetchProfiles } from "@/hooks/useFetchProfiles";
import { AiOutlineSend } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

function Profile() {
  const { session } = useContext(UserContext);
  const [select, setSelect] = useState(0);
  const [all, setAll] = useState([]);
  const [message, setMessage] = useState([]);

  function redirectHome() {
    Router.push("./");
  }

  const sendEmail = (address) => {
    emailjs
      .sendForm(
        "service_xy9vzuj",
        "template_1mww8xr",
        "#myForm",
        "Jeq1B53AeLo3UNxVn",
        address
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmit = (event,index) => {
    console.log("click");
    event?.people?.people.forEach((person) => {
      const templateParams = {
        to_name: "Rider",
        from_name: "Volunteer",
        message: message[index], 
        user_email: data?.find(({ id }) => id === person)?.email,
      };
      console.log(templateParams);
      sendEmail(templateParams);
    });
  };

  const { driverData, passengerrData } = useFetchEvent({
    id: session?.user.id,
  });
  const [combinedArray, setCombinedArray] = useState([]);
  const [getProfiles, setGetProfiles] = useState(false);

  useEffect(() => {
    var newarray = [];
    driverData?.forEach((obj) => {
      newarray.push(obj.people.people);
    });

    setAll(newarray);
  }, [driverData]);

  useEffect(() => {
    if (all.length !== 0) {
      const newArray = all.reduce((accumulator, currentArray) => {
        return accumulator.concat(currentArray);
      }, []);

      setCombinedArray(newArray);
      console.log("array", combinedArray);
    }
  }, [all]);

  useEffect(() => {
    if (combinedArray.length !== 0) {
      setGetProfiles(true);
    }
  }, [combinedArray]);

  const { data } = useFetchProfiles({ profiles: combinedArray }, getProfiles);

  const handleInputChange = (event, index) => {
    const updatedInputs = [...message];
    updatedInputs[index] = event.target.value;
    setMessage(updatedInputs);
  };

  const handleInputBlur = (index) => {
    const lastInput = message[message.length - 1];
    if (lastInput !== "") {
      setMessage([...message, ""]);
    } else if (message.length > 1 && message[index] === "") {
      const updatedInputs = [...message];
      updatedInputs.splice(index, 1);
      setMessage(updatedInputs);
    }
  };

  return (
    <Container justify="center" align="center">
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
          position: "absolute",
          left: "10px",
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
        {`My Profile: ${session?.user.user_metadata.first_name}`}
      </Text>

      <Container>
        <Card
          align="center"
          justify="center"
          alignItems="center"
          css={{
            width: "20%",
            height: "400px",
            position: "absolute",
            left: "0",
          }}
        >
          <Card.Header
            isdivider
            align="center"
            justify="center"
            alignItems="center"
          >
            <Col>
              <Avatar
                css={{ height: "75px", width: "75px", margin: "auto" }}
                src={session?.user.user_metadata.first_name.profile_picture}
              />
              <Text>{session?.user.user_metadata.first_name}</Text>
            </Col>
          </Card.Header>
          <Card.Body>
            <Col align="center" justify="center">
              <Button
                flat
                animated
                auto
                shadow
                onClick={() => setSelect(0)}
                css={{
                  borderRadius: "10px",
                  height: "60px",
                  width: "200px",
                  color: `${select == 0 ? "#FFFFFF" : "#02852E"}`,
                  bg: `${select == 0 ? "#02852E" : "#FFFFFF"}`,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Volunteering
                </Text>
              </Button>
              <Spacer y={0.5} />
              <Button
                flat
                animated
                auto
                shadow
                onClick={() => setSelect(1)}
                css={{
                  borderRadius: "10px",
                  height: "60px",
                  width: "200px",
                  color: `${select == 1 ? "#FFFFFF" : "#02852E"}`,
                  bg: `${select == 1 ? "#02852E" : "#FFFFFF"}`,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Attending
                </Text>
              </Button>
            </Col>
          </Card.Body>
        </Card>
      </Container>
      <Spacer y={5} />
      <Container>
        {select === 0 ? (
          <>
            {driverData
              ? driverData.map((event, index) => (
                  <>
                    <Card css={{ height: "300px", width: "500px" }}>
                      <Card.Header>
                        <Col>
                          <Text weight={"bold"}>{event.name}</Text>
                          <Text>
                            {event.max_people - event.people.people.length}{" "}
                            spots left
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body>
                        <Text weight={"bold"}>
                          Email Riders to set picking up point:
                        </Text>

                        <form
                          id="myForm"
                          onSubmit={(e) => (
                            handleSubmit(event,index), e.preventDefault()
                          )}
                        >
                          <Input
                            type="test"
                            name="message"
                            placeholder="Enter Message"
                            onChange={(e) => handleInputChange(e, index)}
                            onBlur={() => handleInputBlur(index)}
                            value={message[index]}
                          />
                          <Button type="submit">Send Email</Button>
                        </form>
                      </Card.Body>
                    </Card>
                    <Spacer y={0.8} />
                  </>
                ))
              : ""}
          </>
        ) : (
          <>
            {passengerrData
              ? passengerrData.map((event, index) => (
                  <>
                    <Card css={{ height: "300px", width: "500px" }}>
                      <Card.Header>
                        <Col>
                          <Text weight={"bold"}>{event.name}</Text>
                          <Text>
                            {event.max_people - event.people.people.length}{" "}
                            spots left
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body>
                        <Text weight={"bold"}>
                          Email Riders to set picking up point:
                        </Text>

                        <form
                          id="myForm"
                          onSubmit={(e) => (
                            handleSubmit(event,index), e.preventDefault()
                          )}
                        >
                          <Input
                            type="test"
                            name="message"
                            placeholder="Enter Message"
                            onChange={(e) => handleInputChange(e, index)}
                            onBlur={() => handleInputBlur(index)}
                            value={message[index]}
                          />
                          <Button type="submit">Send Email</Button>
                        </form>
                      </Card.Body>
                    </Card>
                    <Spacer y={0.8} />
                  </>
                ))
              : ""}
          </>
        )}
      </Container>
    </Container>
  );
}

export default Profile;
