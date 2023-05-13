import {
  Grid,
  Card,
  Text,
  Container,
  Button,
  Spacer,
  Avatar,
  Col,
  Input,
  Row,
  Dropdown,
  Modal,
} from "@nextui-org/react";
import Router from "next/router";
import EventCard from "@/components/card";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import Aos from "aos";
import { useEffect, useState, useMemo, useContext } from "react";
import { GrLocation } from "react-icons/gr";
import { handleClientScriptLoad } from "next/script";
import { AppContext } from "@/contexts/AppContext";

function Events() {
  function redirectHome() {
    Router.push("./");
  }

  useEffect(() => {
    Aos.init(2000);
  }, []);

  const { events } = useContext(AppContext);
  const [selected, setSelected] = useState(new Set(["Event"]));
  const [time, setTime] = useState(new Set(["Time"]));
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const closeHandler = () => {
    setVisible(false);
  };

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
      <Col align="center" justify="center">
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
        <Spacer y={3} />
        <Row align="center" justify="center">
          <Input
            size="xl"
            placeholder="find events"
            clearable
            css={{ color: "#02852E", border: "#02852E", width: "500px" }}
            contentRight={<AiOutlineSearch />}
          />
        </Row>
        <Spacer y={2} />
        <Row align="center">
          <Grid.Container gap={2} align="center" justify="center">
            <Grid>
              <Button
                onPress={handler}
                iconRight={<GrLocation />}
                css={{
                  background: "#FFFFFF",
                  color: "#02852E",
                  width: "50px",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                }}
              >
                Location
              </Button>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                css={{ height: "300px" }}
              >
                <Modal.Header>
                  <Text>Map</Text>
                </Modal.Header>
              </Modal>
            </Grid>
            <Grid>
              <Dropdown>
                <Dropdown.Button
                  css={{
                    color: "#02852E",
                    height: "40px",
                    background: "#ffffff",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  }}
                  flat
                >
                  {" "}
                  {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selected}
                  onSelectionChange={setSelected}
                >
                  <Dropdown.Item key="sport">Sport</Dropdown.Item>
                  <Dropdown.Item key="conference">Conference</Dropdown.Item>
                  <Dropdown.Item key="concert">Concert</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid>
              <Input
                css={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                  background: "#ffffff",
                  color: "#02852E",
                }}
                width="186px"
                type="date"
              />
            </Grid>
          </Grid.Container>
        </Row>
        <Spacer y={2} />
      </Col>

      <Grid.Container gap={2} alignItems="center" justify="center">
        <>
          {events && events.length > 0 ? (
            <>
              {events.map((event, index) => (
                <EventCard
                  data-aos="fade-up"
                  img={`https://zyyhrcdinczrzawuvnjs.supabase.co/storage/v1/object/public/images/public/${event.image}`}
                  title={event.name}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>{/* no events */}</>
          )}
        </>
        {/*
        <EventCard
          data-aos="fade-up"
          img={
            "https://d1.awsstatic.com/i-pHDD8bP-X2.78f042801854f6eafbe76d6ded04f07f15ecdfd7.jpeg"
          }
          title={"Amazon Dev Convention"}
        />
        <EventCard
          data-aos="fade-up"
          img={
            "https://i.cbc.ca/1.6821289.1682399360!/cpImage/httpImage/maple-leafs-24042023.jpg"
          }
          title={"Leafs Game"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://i.cbc.ca/1.6218940.1634774921!/cumulusImage/httpImage/image.jpg_gen/derivatives/4x3_1180/toronto-raptors-home-opener.jpg"
          }
          title={"Toronto Raptors game"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnEaYFcLYmSDyqKEKQuUILLIjfLCvTGGzTQ&usqp=CAU"
          }
          title={"Concert Toronto"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNJCxEDMQyN2FLUbwel8W5MxVbwGXP1DpdQ&usqp=CAU"
          }
          title={"Beaches"}
        />
        <EventCard
          data-aos="fade-up"
          img={
            "https://d1.awsstatic.com/i-pHDD8bP-X2.78f042801854f6eafbe76d6ded04f07f15ecdfd7.jpeg"
          }
          title={"Amazon Dev Convention"}
        />
        <EventCard
          data-aos="fade-up"
          img={
            "https://i.cbc.ca/1.6821289.1682399360!/cpImage/httpImage/maple-leafs-24042023.jpg"
          }
          title={"Leafs Game"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://i.cbc.ca/1.6218940.1634774921!/cumulusImage/httpImage/image.jpg_gen/derivatives/4x3_1180/toronto-raptors-home-opener.jpg"
          }
          title={"Toronto Raptors game"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGnEaYFcLYmSDyqKEKQuUILLIjfLCvTGGzTQ&usqp=CAU"
          }
          title={"Concert Toronto"}
        />

        <EventCard
          data-aos="fade-up"
          img={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNJCxEDMQyN2FLUbwel8W5MxVbwGXP1DpdQ&usqp=CAU"
          }
          title={"Beaches"}
        />*/}
      </Grid.Container>
    </Container>
  );
}

export default Events;
