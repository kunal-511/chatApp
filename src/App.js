import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
  Avatar,
  AvatarBadge,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import Upload from "./Upload";
import "./App.css";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Message from "./Component/Message";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Header from "./Header";

const auth = getAuth(app);
const collectionName = "chatMessages";
const Messages = collection(getFirestore(app), collectionName);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
const logoutHandler = () => {
  signOut(auth);
};

const db = getFirestore(app);

function App() {
  const divForScroll = useRef(null);
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addDoc(Messages, {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      // Clear the input field by resetting the message state
      setMessage("");
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("");
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "chatMessages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    const unsubscribeMessages = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((item) => ({ id: item.id, ...item.data() })));
    });
    return () => {
      unsubscribe();
      unsubscribeMessages();
    };
  }, []);
  const containerRef = useRef(null);
  const scrollToBottom = () => {
    console.log("Scrolling to bottom");
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  return (
    <>
      <BrowserRouter>
        <Header />

        <Box>
          {user ? (
            <>
              <Container
                ref={containerRef}
                h={"90vh"}
                border={"1px solid grey"}
              >
                <VStack h={"full"}>
                  <HStack w={"full"}>
                    {(() => {
                      const currentUserMessage = messages.find(
                        (item) => item.uid === user?.uid
                      );
                      if (currentUserMessage) {
                        return (
                          <Avatar
                            key={currentUserMessage.id}
                            src={currentUserMessage.uri}
                          />
                        );
                      } else {
                        return null;
                      }
                    })()}
                    <Button
                      marginLeft={"14"}
                      w={"50%"}
                      marginTop={"2"}
                      onClick={logoutHandler}
                      colorScheme="red"
                    >
                      Logout
                    </Button>
                  </HStack>

                  <Box borderBottom={"1px solid "} w={"full"} />
                  <VStack
                    overflowY={"auto"}
                    padding={"4 0"}
                    w={"full"}
                    h={"full"}
                    css={{
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {/* <Message text={"Sample message1"} />
            <Message text={"Sample message2"} user={"me"} /> */}

                    {messages.map((item) => (
                      <Message
                        key={item.id}
                        user={item.uid === user.uid ? "me" : "other"}
                        text={item.text}
                        uri={item.uri}
                      />
                    ))}
                    <div ref={divForScroll}></div>
                  </VStack>

                  <form onSubmit={submitHandler} style={{ width: "100%" }}>
                    <HStack>
                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message"
                      />

                      <Button colorScheme="green">
                        <a href="/upload" element={<Upload />}>
                        <CgAttachment size={"18"} /></a>
                      </Button>
                      <Button colorScheme="green" type="submit">
                        Send
                      </Button>
                    </HStack>
                  </form>
                </VStack>
                <VStack
                  alignItems={"flex-end"}
                  position={"relative"}
                  top={"-16"}
                  left={"70"}
                >
                  <Button onClick={scrollToBottom} colorScheme="green">
                    <BsArrowDownCircleFill size={"19"} />
                  </Button>
                </VStack>
              </Container>
            </>
          ) : (
            <VStack h={"100vh"} justifyContent={"center"} bg={"white"}>
              <Button onClick={loginHandler} colorScheme={"purple"}>
                Sign in with Google
              </Button>
            </VStack>
          )}
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
