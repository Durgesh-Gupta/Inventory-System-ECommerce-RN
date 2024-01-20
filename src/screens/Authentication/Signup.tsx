import { StyleSheet, View } from "react-native";
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
} from "native-base";

const Signup = (props) => {
  return (
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
          Create an account to start managing your inventory. It's quick, easy,
          and hassle-free.
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button mt="2" colorScheme="indigo">
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
  );
};

export default Signup;

const styles = StyleSheet.create({});
