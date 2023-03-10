"use client";

import { EncryptModifiedRC4 } from "@/function/modified-rc4";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import fileDownload from "js-file-download";
import { ChangeEvent, FormEvent, useState } from "react";

export default function VigenerePage() {
  const [inputState, setInputState] = useState({
    plaintext: "",
    key: "",
    ciphertext: "",
  });

  const onFileUpload =
    (type: "plaintext" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const text = e.target.result;
        console.log(text);
        setInputState({ ...inputState, [type]: text });
      };
      if (e.target.files) {
        reader.readAsText(e.target.files[0]);
      }
    };

  const handleInputChange =
    (key: "plaintext" | "key" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({ ...inputState, [key]: e.target.value });
    };

  const handleEncryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    setInputState({
      ...inputState,
      ciphertext: EncryptModifiedRC4(inputState.plaintext, inputState.key),
    });
  };

  const handleDecryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    setInputState({
      ...inputState,
      plaintext: EncryptModifiedRC4(inputState.ciphertext, inputState.key),
    });
  };

  const handleSaveOutput = () => (e: FormEvent<HTMLButtonElement>) => {
    fileDownload(inputState.ciphertext, "ciphertext");
  };

  return (
    <>
      <Center>
        <Text fontWeight="bold" fontSize="2xl">
          Modified RC4
        </Text>
      </Center>
      <Container maxW="5xl">
        <Box mt={7} bg="gray.100" rounded="md" p={4} mb={5}>
          <Grid
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2} rowSpan={4}>
              <Text>Plaintext</Text>
              <Textarea
                value={inputState.plaintext}
                onChange={handleInputChange("plaintext")}
                w="100%"
                h="80%"
                border="2px"
                borderColor="blue.200"
                mb={2}
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept=".txt"
                onChange={onFileUpload("plaintext")}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input
                  placeholder="Key"
                  onChange={handleInputChange("key")}
                  value={inputState.key}
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} rowSpan={4} w="100%">
              <Text>Ciphertext</Text>
              <Textarea
                value={inputState.ciphertext}
                onChange={handleInputChange("ciphertext")}
                w="100%"
                h="80%"
                border="2px"
                borderColor="blue.200"
                mb={2}
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept=".txt"
                onChange={onFileUpload("ciphertext")}
              />
            </GridItem>
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleEncryptText()}
                rightIcon={<ArrowForwardIcon />}
              >
                Enkripsi Text
              </Button>
            </GridItem>
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleDecryptText()}
                leftIcon={<ArrowBackIcon />}
              >
                Dekripsi Text
              </Button>
            </GridItem>
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleSaveOutput()}
                leftIcon={<DownloadIcon />}
              >
                Download Ciphertext{" "}
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
