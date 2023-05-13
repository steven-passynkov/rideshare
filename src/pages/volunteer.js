import {
  Text,
  Container,
  Spacer,
  Button,
  Card,
  Col,
  Row,
  Progress,
  Input,
} from "@nextui-org/react";
import { AiOutlineHome } from "react-icons/ai";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAddEvent } from "@/hooks/useAddEvent";
import { useAddImage } from "@/hooks/useAddImage";

function Volunteer() {
  const titles = [
    "Title",
    "Number of Seats",
    "When are you going?",
    "Picture of Event",
    "RideShare has been posted !",
  ];

  const [shouldAddEvent, setShouldAddEvent] = useState(false);
  const [progress, setProgress] = useState(100 / 5);
  const [title, setTitle] = useState(0);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [inputT, setinputT] = useState(0);

  const { data, error } = useAddImage({ image: image });

  useAddEvent(
    {
      name: "steven",
      description: "me",
      location: "home",
      image: data?.path.split("/").pop(),
      max_people: "4",
    },
    shouldAddEvent
  );

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  }

  function redirectHome() {
    Router.push("./");
  }

  function nextStep() {
    if (title == 4) {
      setShouldAddEvent(true);
      redirectHome();
    } else {
      setProgress(progress + 100 / 5);
      setTitle(title + 1);
      setinputT(inputT + 1);
    }
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
        Volunteer RideShare
      </Text>

      <Spacer y={2} />
      <Progress value={progress} shadow color="success" />

      <Col align="center" justify="center">
        <Spacer y={2} />

        <Card css={{ width: "50%", height: "300px", textAlign: "center" }}>
          <Card.Header css={{ textAlign: "center" }}>
            <Row align="center">
              <Text
                h2
                weight="bold"
                css={{
                  textGradient: "45deg, $green900 -20%, $green800 50%",
                  m: 0,
                  textAlign: "center",
                }}
              >
                {titles[title]}
              </Text>
            </Row>
          </Card.Header>
          <Card.Body align="center" justify="center">
            {inputT == 0 ? (
              <Input
                clearable
                underlined
                initialValue="title of your event"
                size="lg"
              />
            ) : inputT == 1 ? (
              <Input label="Number of Seats" type="number" placeholder="4" />
            ) : inputT == 2 ? (
              <Input type="datetime-local" />
            ) : inputT == 3 ? (
              <>
                <Input
                  type="file"
                  label="Event Picture"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                {imageUrl && <img src={imageUrl} alt="selected" />}
              </>
            ) : (
              <Text size={20}>
                Completed ! Your RideShare has been made public.
              </Text>
            )}
          </Card.Body>
          <Card.Footer>
            <Row align="center">
              <Spacer x={10} />
              <Button
                onClick={nextStep}
                auto
                ghost
                shadow
                rounded
                color="#02852E"
                css={{
                  color: "#02852E",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  "&:hover": {
                    opacity: 0.8,
                  },
                  width: "30%",
                  height: "50px",
                }}
              >
                {title == 4 ? "Close" : "Next"}
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}

export default Volunteer;
