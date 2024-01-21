import { StyleSheet } from "react-native";
import React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Text,
  HStack,
  Link,
  Pressable,
  Icon,
  ScrollView,
} from "native-base";
import { isValidEmail } from "../../utils";
import { MaterialIcons } from "@expo/vector-icons";
import { insertUser } from "../../services/DatabaseService";

const Signup = (props) => {
  const [show, setShow] = React.useState(false);

  let InitilUserData = {
    email: "",
    name: "",
    phone: "",
    password: "",
    cpassword: "",
  };
  const [UserData, setUserData] = React.useState(InitilUserData);
  let InitialFormState = {
    isNameValid: false,
    isNameFocused: false,
    isPhoneValid: false,
    isPhoneFocused: false,
    isEmailValid: false,
    isPasswordValid: false,
    isEmailFocused: false,
    isPasswordFocused: false,
    isCPasswordValid: false,
    isCPasswordFocused: false,
  };
  const [Validation, setValidation] = React.useState(InitialFormState);

  const handleSubmit = async () => {
    setValidation((prev) => ({
      ...prev,
      isEmailFocused: true,
      isNameFocused: true,
      isPhoneFocused: true,
      isPasswordFocused: true,
      isCPasswordFocused: true,
    }));
    if (
      !isValidEmail(UserData.email) ||
      UserData.name.length < 3 ||
      UserData.phone.length != 10 ||
      UserData.password.length < 6 ||
      UserData.password != UserData.cpassword
    ) {
      return;
    }
    let response = await insertUser(
      UserData.name,
      UserData.email,
      UserData.password
    );
    console.log("response", response);
    console.log("Submit");
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Center w="100%" style={{ flex: 1 }}>
        <Box safeArea p="2" w="90%" maxW="320" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Join Us Today!
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Create an account to start managing your inventory. It's quick,
            easy, and hassle-free.
          </Heading>
          <VStack space={3} mt="5">
            <FormControl
              isInvalid={Validation.isNameFocused && UserData.name.length < 3}
            >
              <FormControl.Label>Name</FormControl.Label>
              <Input
                onChangeText={(e) => {
                  setUserData((prev) => ({ ...prev, name: e }));
                  setValidation((prev) => ({
                    ...prev,
                    isNameValid: e.length > 2,
                  }));
                }}
                onBlur={() =>
                  setValidation((prev) => ({ ...prev, isNameFocused: true }))
                }
              />
              <FormControl.ErrorMessage>
                Name atleast be 3 character long!{" "}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                Validation.isPhoneFocused && UserData.phone.length != 10
              }
            >
              <FormControl.Label>Phone</FormControl.Label>
              <Input
                keyboardType="number-pad"
                onChangeText={(e) => {
                  setUserData((prev) => ({ ...prev, phone: e }));
                  setValidation((prev) => ({
                    ...prev,
                    isPhoneValid: e.length == 10,
                  }));
                }}
                onBlur={() =>
                  setValidation((prev) => ({ ...prev, isPhoneFocused: true }))
                }
              />
              <FormControl.ErrorMessage>
                Phone number is not valid!{" "}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                Validation.isEmailFocused && !isValidEmail(UserData.email)
              }
            >
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(e) => {
                  setUserData((prev) => ({ ...prev, email: e }));
                  setValidation((prev) => ({
                    ...prev,
                    isEmailValid: isValidEmail(e),
                  }));
                }}
                onBlur={() =>
                  setValidation((prev) => ({ ...prev, isEmailFocused: true }))
                }
              />
              <FormControl.ErrorMessage>
                Email id is invalid!
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                Validation.isPasswordFocused && UserData.password.length < 6
              }
            >
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type={show ? "text" : "password"}
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
                onChangeText={(e) => {
                  setUserData((prev) => ({ ...prev, password: e }));
                  setValidation((prev) => ({
                    ...prev,
                    isPasswordValid: e.length > 5,
                  }));
                }}
                onBlur={() =>
                  setValidation((prev) => ({
                    ...prev,
                    isPasswordFocused: true,
                  }))
                }
              />
            </FormControl>
            <FormControl
              isInvalid={
                Validation.isCPasswordFocused &&
                UserData.password != UserData.cpassword &&
                UserData.cpassword.length < 6
              }
            >
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={(e) => {
                  setUserData((prev) => ({ ...prev, cpassword: e }));
                  setValidation((prev) => ({
                    ...prev,
                    isCPasswordValid: e == UserData.password,
                  }));
                }}
                onBlur={() =>
                  setValidation((prev) => ({
                    ...prev,
                    isCPasswordFocused: true,
                  }))
                }
              />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
              Sign up
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already have an account?
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => props.navigation.navigate("Login")}
              >
                Log in here.
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
