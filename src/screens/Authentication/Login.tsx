import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  Box,
  Button,
  Center,
  Text,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  authenticateUser,
  getCurrentUserId,
} from "../../services/DatabaseService";
import Toast from "react-native-toast-message";
import { isElementAccessChain } from "typescript";
import { isValidEmail } from "../../utils";

const Login = (props) => {
  const [show, setShow] = React.useState(false);
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  let InitialFormState = {
    isEmailValid: false,
    isPasswordValid: false,
    isEmailFocused: false,
    isPasswordFocused: false,
  };
  const [Validation, setValidation] = React.useState(InitialFormState);
  console.log("Validation", Validation);
  console.log("Email", Email, Password);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let UserId = await getCurrentUserId();
    console.log("UserId", UserId);
    if (UserId) props.navigation.push("Dashboard");
  };

  React.useEffect(() => {
    setValidation((prev) => ({
      ...prev,
      isEmailValid: isValidEmail(Email),
      isPasswordValid: Password.length > 5,
    }));
  }, [Email, Password]);

  const handleSubmit = async () => {
    console.log("Inside Submit");
    setValidation((prev) => ({
      ...prev,
      isEmailFocused: true,
      isPasswordFocused: true,
    }));
    if (!isValidEmail(Email)) {
      setValidation((prev) => ({ ...prev, isEmailValid: false }));
      return;
    }
    setValidation((prev) => ({ ...prev, isEmailValid: true }));
    if (Password.length < 6) {
      setValidation((prev) => ({ ...prev, isPasswordValid: false }));
      return;
    }
    setValidation((prev) => ({ ...prev, isPasswordValid: true }));

    let response = await authenticateUser(Email, Password);
    console.log("response", response);
    if (response) {
      Toast.show({
        type: "success",
        text1: "Login Successfully",
      });
      setTimeout(() => {
        props.navigation.navigate("Dashboard");
      }, 1500);
    } else {
      Toast.show({
        type: "error",
        text1: "Email or Password not Matched",
      });
    }
  };

  return (
    <Center w="100%" style={{ flex: 1 }}>
      <Box safeArea p="2" py="8" w="90%" maxW="320">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome Back!
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Log in to your account to access your inventory and manage your
          products seamlessly.
        </Heading>

        <VStack space={3} mt="5">
          <FormControl
            isRequired
            isInvalid={Validation.isEmailFocused && !Validation.isEmailValid}
          >
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              onChangeText={setEmail}
              onBlur={() => {
                setValidation((prev) => ({ ...prev, isEmailFocused: true }));
              }}
            />
            <FormControl.ErrorMessage>
              Email id is invalid!
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={
              Validation.isPasswordFocused && !Validation.isPasswordValid
            }
          >
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={setPassword}
              type={show ? "text" : "password"}
              onBlur={() => {
                setValidation((prev) => ({ ...prev, isPasswordFocused: true }));
              }}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />
            <FormControl.ErrorMessage>
              Password is invalid!
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => props.navigation.navigate("Signup")}
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => props.navigation.navigate("Signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;

const styles = StyleSheet.create({});
