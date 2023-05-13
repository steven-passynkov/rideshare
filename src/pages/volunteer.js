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

function Volunteer() {
  const client = new Client({
    access_token: "pNrkHskYP8fb9fUMBEJ57mQKL8RBctFMyNm2YVa9",
  });

  const titles = [
<<<<<<< HEAD
    "Event Title",
    "Event Location",
    "Number of Car Seats",
    "When are you going?",
    "Picture of Event",
    "Information",
=======
    "Title",
    "Location",
    "Number of Seats",
    "When are you going?",
    "Picture of Event",
    "Description",
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD
  const [select, setSelect] = useState([]);
  const [cat, setCat] = useState(false);
=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93

  const { data, error } = useAddImage({ image: image });

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
      eventTime: time,
    },
    shouldAddEvent
  );

  function handleSearchInputChange(event) {
    setValid(false);
    const { value } = event.target;
    setSearchInput(value);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoicGFzc3lua292c3RldmVuIiwiYSI6ImNsMGlvNnQ5czA0bWkzaXJrOHg5eXBjNnMifQ.9AFfFE9nShNjH-Eg-XZrgQ&autocomplete=true&types=address`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.features);
      });
  }

<<<<<<< HEAD
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
  }

=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setValid(true);
  }

  function redirectHome() {
    Router.push("./");
  }

  function nextStep() {
<<<<<<< HEAD
    console.log(title);
=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD

    if (title == 3 && time) {
      setValid(true);
    }
=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
  });

  function changeTitle(e, functions, states) {
    functions(e);
    setValid(true);
  }

  function writeTitle(e) {
<<<<<<< HEAD
    setValid(true);
    setEvents([]);
    setEventTitle(e);
    client.events
      .search({ q: `${e}`, "start.gte": "2023-05-02" })
=======
    setValid(false);
    setEvents([]);
    setEventTitle(e);
    client.events
      .search({ q: `${e}` })
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
      .then((results) => {
        for (const event of results) {
          setEvents((oldArray) => [...oldArray, event]);
        }
<<<<<<< HEAD
      })
      .catch((err) => console.error(err));

    console.log(events);
=======
    ).catch(
        err => console.error(err)
    );

    console.log(events)

    setValid(true)

   
    
   
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD
                        setDescription(event.description),
                        setTime(
                          event.start.split(":")[0] +
                            ":" +
                            event.start.split(":")[1]
                        ),
=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD
              <Grid.Container justify="space-evenly" gap={2}>
                {categories
                  ? categories.map((cat, index) => (
                      <Grid xs={4}>
                        <Button
                          key={index}
                          onClick={() => toggle(index)}
                          css={{
                            border: "#02852E",
                            color: `${
                              select.includes(index) ? "#ffffff" : "#02852E"
                            }`,
                            background: `${
                              select.includes(index) ? "#02852E" : "#ffffff"
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
=======
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD
                  {title == 6 ? "Done!" : "Next"}
=======
                  {title == 5 ? "Close" : "Next"}
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
<<<<<<< HEAD
                  {title == 6 ? "Close" : "Next"}
=======
                  {title == 5 ? "Close" : "Next"}
>>>>>>> 4c7feaa8e577295239ca17abbebf6cab7c655a93
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
