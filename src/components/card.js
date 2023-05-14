import {
  Grid,
  Card,
  Text,
  Col,
  Row,
  Button,
  Spacer,
  Avatar,
  Modal,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Map from "react-map-gl";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useEditEvent } from "@/hooks/useEditEvent";
import { useFetchProfiles } from "@/hooks/useFetchProfiles";
import { useFetchProfile } from "@/hooks/useFetchProfile";

function EventCard(props) {
  const [visible, setVisible] = useState(false);
  const openModule = () => setVisible(true);
  const { session } = useContext(UserContext);
  const [shouldJoin, setShouldJoin] = useState(false);
  const [shouldLoad, setShouldLoad] = useState();

  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 5,
    maxZoom: 15,
    minZoom: 5,
  });
  const [coordinates, setCoordinates] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const pictureUsers = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  ];

  const { loaded } = useEditEvent(
    { name: session.user.id, id: props.id, max_people: props.max_people },
    shouldLoad,
    shouldJoin
  );

  const { data: driver } = useFetchProfile(
    { profile: props.volunteer },
    visible
  );

  const { data: people } = useFetchProfiles(
    { profiles: props.people.people },
    visible
  );

  console.log(props.people.people)

  function joinedRide() {
    setShouldJoin(true);
    closeHandler();
  }

  useEffect(() => {
    if (visible === true) {
      setShouldLoad(true);
    }
    if (visible === false) {
      setShouldLoad(false);
    }
  }, [visible]);

  return (
    <Grid>
      <Card css={{ w: "400px", h: "300px" }} isHoverable pointer>
        <Card.Header
          css={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            width: "100%",
            bg: "white",
            opacity: 0.85,
            bgBlur: "#ffffff00",
          }}
        >
          <Col width="100%">
            <Text
              size={14}
              weight="bold"
              transform="uppercase"
              color="#AAFF00"
              css={{ cursor: "pointer" }}
            >
              {props.time?.split("T")[0]}
            </Text>
            <Text
              h3
              transform="uppercase"
              weight="bold"
              color="#AAFF00"
              css={{ cursor: "pointer" }}
            >
              {props.title}
            </Text>
          </Col>
        </Card.Header>

        <Card.Body css={{ p: 0 }}>
          <Modal
            width="40%"
            height="100%"
            closeButton
            animated
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Col>
                <Text
                  h3
                  transform="uppercase"
                  weight="bold"
                  size={30}
                  css={{
                    textGradient: "45deg, $green900 -20%, $green800 50%",
                    m: 0,
                    cursor: "pointer",
                  }}
                >
                  {props.title}
                </Text>
                <Text
                  size={14}
                  weight="bold"
                  transform="uppercase"
                  color="#000000"
                  css={{ cursor: "pointer" }}
                >
                  {props.time?.split("T")[0]} at {props.time?.split("T")[1]}
                </Text>
              </Col>
            </Modal.Header>
            <Modal.Body>
              <Col justify="space-evenly" align="center">
                <Text p size={10}>
                  {props.description}
                </Text>
                <Spacer y={2} />
                <Card css={{ w: "100%", h: "200px" }}>
                  <Card.Body>
                    <Map
                      {...viewport}
                      dragRotate={false}
                      touchZoomRotate={false}
                      onDrag={(event) =>
                        setViewport((prevViewPortState) => ({
                          ...prevViewPortState,
                          latitude: event.viewState.latitude,
                          longitude: event.viewState.longitude,
                        }))
                      }
                      onZoom={(event) =>
                        setViewport((prevViewPortState) => ({
                          ...prevViewPortState,
                          zoom: event.viewState.zoom,
                        }))
                      }
                      mapStyle="mapbox://styles/mapbox/streets-v11"
                      mapboxAccessToken="pk.eyJ1IjoicGFzc3lua292c3RldmVuIiwiYSI6ImNsMGlvNnQ5czA0bWkzaXJrOHg5eXBjNnMifQ.9AFfFE9nShNjH-Eg-XZrgQ"
                    >
                      <Marker
                        latitude={coordinates.latitude}
                        longitude={coordinates.longitude}
                      >
                        location
                      </Marker>
                    </Map>
                  </Card.Body>
                </Card>
                <Spacer y={1} />
                <Row align="center">
                  <Col>
                    <Row align="center">
                      {driver ? (
                        <User
                          src={`https://zyyhrcdinczrzawuvnjs.supabase.co/storage/v1/object/public/images/${driver[0].profile_picture}`}
                          name={driver[0].name}
                          description="Driver"
                        />
                      ) : (
                        <></>
                      )}
                    </Row>
                  </Col>

                  <Col>
                    <Grid.Container
                      gap={2}
                      alignItems="center"
                      justify="space=between"
                    >
                      {people ? (
                        <>
                          {people.map((person, index) => (
                            <Grid>
                              <User
                                src={`https://zyyhrcdinczrzawuvnjs.supabase.co/storage/v1/object/public/images/${person.profile_picture}`}
                                name={person.name}
                                description="Rider"
                                key={index}
                              />
                            </Grid>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid.Container>
                  </Col>
                </Row>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              {props.seats !== "full" && loaded !== false ? (
                <Button
                  auto
                  ghost
                  shadow
                  rounded
                  color="#02852E"
                  onPress={() => joinedRide()}
                  css={{
                    color: "#02852E",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  Join Ride
                </Button>
              ) : (
                <Button
                  disabled
                  auto
                  ghost
                  shadow
                  rounded
                  color="#02852E"
                  onPress={() => joinedRide()}
                  css={{
                    color: "#02852E",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  Join Ride
                </Button>
              )}

              <Text p size={10}>
                {props.seats == "full"
                  ? "Ride is Full"
                  : `${props.seats} spots available`}
              </Text>
            </Modal.Footer>
          </Modal>
          <Card.Image
            showSkeleton
            src={props.img}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Card image background"
          />
        </Card.Body>

        <Card.Footer
          height="100px"
          alignItems="center"
          justify="center"
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row alignItems="center" justify="center">
            <Col>
              <Row align="center" justify="space-between">
                <Col span={6}>
                  <Avatar.Group>
                    {pictureUsers.map((url, index) => (
                      <Avatar
                        key={index}
                        size="md"
                        pointer
                        src={url}
                        stacked
                        color="#ffffff"
                        textColor="#ffffff"
                      />
                    ))}
                  </Avatar.Group>
                </Col>
                <Spacer x={2} />
                <Text
                  p
                  css={{ margin: "0", cursor: "pointer" }}
                  size={12}
                  bold
                  color="#ffffff"
                >
                  {props.seats !== "full"? 
                 ` ${props.seats} spots left` : "No spots left"}
                </Text>
              </Row>
            </Col>
            <Col justify="center" alignItems="center">
              <Row justify="flex-end" alignItems="center">
                 <Button
                  flat
                  animated
                  auto
                  shadow
                  rounded
                  onClick={openModule}
                  css={{
                    color: "#02852E",
                    bg: "rgba(255, 255, 255, 0.8)",
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
                    Join Ride
                  </Text>
                </Button> 
               
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}

export default EventCard;
