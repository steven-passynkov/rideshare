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
  Grid,
} from "@nextui-org/react";
import { AiOutlineHome } from "react-icons/ai";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAddEvent } from "@/hooks/useAddEvent";
import { useAddImage } from "@/hooks/useAddImage";
import Client from "predicthq";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

function Volunteer() {
  const client = new Client({
    access_token: "pNrkHskYP8fb9fUMBEJ57mQKL8RBctFMyNm2YVa9",
  });

  const titles = [
    "Event Title",
    "Event Location",
    "Number of Car Seats",
    "When are you going?",
    "Picture of Event",
    "Information",
    "RideShare has been posted !",
  ];

  const [shouldAddEvent, setShouldAddEvent] = useState(false);
  const [progress, setProgress] = useState(100 / 6);
  const [title, setTitle] = useState(0);
  const [image, setImage] = useState();
  const [inputT, setinputT] = useState(0);
  const [eventTitle, setEventTitle] = useState("");
  const [carSpace, setCarSpace] = useState(0);
  const [time, setTime] = useState(null);
  const [valid, setValid] = useState(false);
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [events, setEvents] = useState([]);
  const [select, setSelect] = useState([]);
  const [cat, setCat] = useState(false);
  const { session } = useContext(UserContext);

  const { data, error } = useAddImage({ image: image });
  const [allCategories, setCategories] = useState([]);

  const categories = [
    "concerts",
    "community",
    "sports",
    "conference",
    "festival",
    "expos",
  ];

  useAddEvent(
    {
      name: eventTitle,
      description: description,
      location: selectedResult,
      image: data?.path.split("/").pop(),
      max_people: carSpace,
      date: time?.split("T")[0],
      time: time?.split("T")[1],
      categories: select,
      user: session?.user.id,
    },
    shouldAddEvent
  );

  function handleSearchInputChange(event) {
    setValid(true);
    const { value } = event.target;
    setSearchInput(value);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoicGFzc3lua292c3RldmVuIiwiYSI6ImNsMGlvNnQ5czA0bWkzaXJrOHg5eXBjNnMifQ.9AFfFE9nShNjH-Eg-XZrgQ&autocomplete=true&types=address`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.features);
      });
  }

  function toggle(index) {
    if (select.includes(index)) {
      setSelect(
        select.filter(function (item) {
          return item !== index;
          setCat(true);
        })
      );
    } // only splice array when item is found
    else {
      if (select.length < 3) {
        setSelect((prevArray) => [...prevArray, index]);
        setCat(true);
      }
    }

    console.log(select);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setValid(true);
  }

  function redirectHome() {
    Router.push("./");
  }

  function nextStep() {
    console.log(title);
    if (title == 5) {
      setShouldAddEvent(true);
      redirectHome();
    } else {
      setProgress(progress + 100 / 6);
      setTitle(title + 1);
      setinputT(inputT + 1);
      setValid(false);
    }
  }

  useEffect(() => {
    if (title == 5) {
      setValid(true);
    }

    if (title == 3 && time) {
      setValid(true);
    }
  });

  function changeTitle(e, functions, states) {
    functions(e);
    setValid(true);
  }

  function writeTitle(e) {
    setValid(true);

    setEvents([]);
    setEventTitle(e);
    client.events
      .search({ q: `${e}`, "start.gte": "2023-05-02" })
      .then((results) => {
        for (const event of results) {
          setEvents((oldArray) => [...oldArray, event]);
        }
      })
      .catch((err) => console.error(err));

    console.log(events);
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
          <Card.Body
            className="volunteerCard"
            align="center"
            justify="center"
            css={{ overflowY: `${inputT == 5 ? "scroll" : "hidden"}` }}
          >
            {inputT == 0 ? (
              <>
                <Input
                  clearable
                  underlined
                  value={eventTitle}
                  onChange={(e) => writeTitle(e.target.value)}
                  initialValue="title of your event"
                  size="lg"
                />
                <ul className="list">
                  {events?.map((event, index) => (
                    <li
                      className="listItem"
                      key={index}
                      onClick={() => (
                        setEventTitle(event.title),
                        setEvents([]),
                        setDescription(event.description),
                        setTime(
                          event.start.split(":")[0] +
                            ":" +
                            event.start.split(":")[1]
                        ),
                        setValid(true)
                      )}
                    >
                      {event.title}
                    </li>
                  ))}
                </ul>
              </>
            ) : inputT == 1 ? (
              <>
                <Input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  placeholder="Enter an address"
                />
                <ul className="list">
                  {searchResults?.map((result) => (
                    <li
                      className="listItem"
                      key={result.id}
                      onClick={() => (
                        setSelectedResult(result),
                        setSearchResults(null),
                        setSearchInput(result.place_name),
                        setValid(true)
                      )}
                    >
                      {result.place_name}
                    </li>
                  ))}
                </ul>
              </>
            ) : inputT == 2 ? (
              <Input
                label="Number of Seats"
                type="number"
                value={carSpace}
                placeholder="4"
                onChange={(e) =>
                  changeTitle(e.target.value, setCarSpace, carSpace)
                }
              />
            ) : inputT == 3 ? (
              <Input
                type="datetime-local"
                value={time}
                onChange={(e) => changeTitle(e.target.value, setTime, time)}
              />
            ) : inputT == 4 ? (
              <>
                <Input
                  type="file"
                  rounded
                  shadow
                  label="Event Picture"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
              </>
            ) : inputT == 5 ? (
              <Grid.Container justify="space-evenly" gap={2}>
                {categories
                  ? categories.map((cat, index) => (
                      <Grid xs={4}>
                        <Button
                          key={index}
                          onPress={() => toggle(categories[index])}
                          css={{
                            border: "#02852E",
                            color: `${
                              select.includes(categories[index])
                                ? "#ffffff"
                                : "#02852E"
                            }`,
                            background: `${
                              select.includes(categories[index])
                                ? "#02852E"
                                : "#ffffff"
                            }`,
                            boxShadow:
                              "rgba(100, 100, 111, 0.1) 0px 7px 25px 0px;",
                            "&:hover": {
                              opacity: 0.7,
                            },
                          }}
                        >
                          {cat}
                        </Button>
                      </Grid>
                    ))
                  : ""}
              </Grid.Container>
            ) : inputT == 6 ? (
              <Input
                clearable
                underlined
                value={description}
                onChange={(e) =>
                  changeTitle(e.target.value, setDescription, description)
                }
                initialValue="title of your event"
                size="lg"
              />
            ) : (
              <Text size={20}>
                Completed ! Your RideShare has been made public.
              </Text>
            )}
          </Card.Body>
          <Card.Footer>
            <Row align="center" justify="center">
              {valid ? (
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
                  {title == 6 ? "Done!" : "Next"}
                </Button>
              ) : (
                <Button
                  auto
                  ghost
                  disabled
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
                  {title == 6 ? "Close" : "Next"}
                </Button>
              )}
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}

export default Volunteer;
