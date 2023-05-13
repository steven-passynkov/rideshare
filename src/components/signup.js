import { Button, Text, Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { useSignup } from "@/hooks/useSignup";
import { useState, useEffect } from "react";

function Signup(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [shouldSignup, setShouldSignup] = useState();

  const { data, error } = useSignup(
    { name: name, email: email, password: password },
    shouldSignup
  );

  useEffect(() => {
    if (error) {
      setShouldSignup(false);
    }
  }, [error]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={props.open}
      onClose={props.setopen}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          SignUp
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="#59A160"
          size="lg"
          placeholder="Name"
          contentLeft={<BsFillPersonFill fill="currentColor" />}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="#59A160"
          size="lg"
          placeholder="Email"
          contentLeft={<BsPerson fill="currentColor" />}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="#59A160"
          size="lg"
          placeholder="Password"
          type="password"
          contentLeft={<AiOutlineMail fill="currentColor" />}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          animated
          shadow
          css={{
            color: "#FFFFFF",
            bg: "#02852E",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            "&:hover": {
              opacity: "0.6",
            },
          }}
          onPress={props.setopen}
        >
          Close
        </Button>
        <Button
          flat
          animated
          auto
          shadow
          css={{
            color: "#02852E",
            bg: "rgba(255, 255, 255, 0.8)",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            "&:hover": {
              opacity: "0.6",
            },
          }}
          //onPress={props.setopen}
          onPress={() => setShouldSignup(true)}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Signup;
