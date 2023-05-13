import { Button, Text, Modal, Input, Row, Checkbox } from "@nextui-org/react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill, BsPerson } from "react-icons/bs";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useState } from "react";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [shouldLogin, setShouldLogin] = useState();

  const { data, error } = useLogin(
    { email: email, password: password },
    shouldLogin
  );

  useEffect(() => {
    if (error) {
      setShouldLogin(false);
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
          Login
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="#59A160"
          size="lg"
          placeholder="Email"
          contentLeft={<BsFillPersonFill fill="currentColor" />}
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
          contentLeft={<BsPerson fill="currentColor" />}
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
          onPress={() => setShouldLogin(true)}
        >
          Log in
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
