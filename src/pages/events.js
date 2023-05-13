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
import { useEffect, useState, useMemo } from "react";
import { GrLocation } from "react-icons/gr";
import { handleClientScriptLoad } from "next/script";
import { useFetchEvents } from "@/hooks/useFetchEvents";

function Events() {
  function redirectHome() {
    Router.push("./");
  }

  useEffect(() => {
    Aos.init(2000);
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState(new Set(["Event"]));
  const [date, setDate] = useState();
  const [time, setTime] = useState(new Set(["Time"]));
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const { events, count, error } = useFetchEvents({
    pageNumber: page,
    pageSize: pageSize,
    search: search,
    categories: categorie,
    date: date,
  });

  useEffect(() => {
    setPage(1);
  }, [search]);

  const categorieValue = useMemo(
    () => Array.from(categorie).join(", ").replaceAll("_", " "),
    [categorie]
  );

  const closeHandler = () => {
    setVisible(false);
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, count);

  const totalPages = Math.ceil(count / pageSize);

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
            onChange={(event) => setSearch(event.target.value)}
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
                  {categorieValue}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Single selection actions"
                  color="secondary"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={categorie}
                  onSelectionChange={setCategorie}
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
                onChange={(event) => setDate(event.target.value)}
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
              {events
                //.filter((event) =>
                //event.name.toLowerCase().includes(search || "".toLowerCase())
                //)
                .map((event, index) => (
                  <EventCard
                    data-aos="fade-up"
                    img={`https://zyyhrcdinczrzawuvnjs.supabase.co/storage/v1/object/public/images/public/${event.image}`}
                    title={event.name}
                    key={index}
                    id={event.id}
                    seats={
                      event.people
                        ? event.people.length() - event.max_people
                        : event.max_people
                    }
                    time={event.eventTime}
                    description={event.description}
                    volunteer={event.user}
                    people={event.people}
                  />
                ))}
            </>
          ) : (
            <>{/* no events */}</>
          )}
        </>
      </Grid.Container>
      <Spacer y={2} />
      <Col align="center" justify="center">
        <Row align="center" justify="center">
          <Button
            flat
            animated
            auto
            shadow
            rounded
            css={{
              color: "#FFFFFF",
              bg: "#02852E",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            disabled={page === 1}
            onClick={() => setPage((prevPageNumber) => prevPageNumber - 1)}
          >
            Previous Page
          </Button>
          <Spacer x={1} />
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
              "&:hover": {
                opacity: 0.8,
              },
            }}
            disabled={page === totalPages}
            onClick={() => setPage((prevPageNumber) => prevPageNumber + 1)}
          >
            Next Page
          </Button>
        </Row>
        <Spacer y={1} />

        <Row align="center" justify="center">
          <p>
            Showing events {start} to {end} of {count}
          </p>
        </Row>
      </Col>

      <Spacer y={3} />
    </Container>
  );
}

export default Events;
