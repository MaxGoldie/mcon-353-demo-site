import { useEffect, useState } from "react";
import { useInterval } from "../../hooks/use-interval";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../chat/chat.css";
import { ButtonGroup } from "@mui/material";

export const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [inputChat, setChatInput] = useState("");
  const [inputUser, setUserInput] = useState("");

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(247, 214, 247);",
      },
      neutral: {
        main: "rgb(31, 31, 84);",
        contrastText: "#fff",
      },
    },
  });

  function getChats() {
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
      .then((response) => response.json())
      .then((data) => {
        console.log("chats:");
        console.log(data);

        setChats(data.Items);
      });
  }

  function setChat(chat) {
    setCurrentChat(chat);
    getMessages(chat.id);
  }

  function getMessages(chatId) {
    fetch(
      `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("messages:");
        console.log(data);

        setMessages(data.Items);
      });
  }

  function postMessage() {
    if (currentChat != null) {
      const message = {
        chatId: currentChat.id, // required, must be an existing chat id
        username: inputUser || "Class 2023", // required
        text: inputMessage, // required
      };

      fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(message),
      });

      setInputMessage("");
    } else {
      <h1>kk</h1>;
      console.log("cannot post a message because currentChat is null");
    }
  }

  function onMessageInput(event) {
    console.log(event);
    setInputMessage(event.target.value);
  }

  function onChatInput(event) {
    console.log(event);
    setChatInput(event.target.value);
  }

  function onUserInput(event) {
    console.log(event);
    setUserInput(event.target.value);
  }

  function newChat() {
    const chat = {
      name: inputChat,
    };

    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
      },
      body: JSON.stringify(chat),
    }).then(setChatInput(""));
  }

  useEffect(() => {
    getChats();
  }, []);

  useInterval(
    (params) => {
      const chatId = params[0];
      if (chatId) {
        getMessages(chatId);
      }
    },
    1000,
    currentChat && currentChat.id
  );

  return (
    <div class="pages">
      <ThemeProvider theme={theme}>
        <div style={{ display: "flex" }}>
          <div>
            <div style={{ paddingTop: "60px" }}>
              <TextField
                onInput={onUserInput}
                value={inputUser}
                id="standard-basic"
                label="Enter Username"
                variant="standard"
              />
            </div>

            <div style={{ paddingTop: "60px" }}>
              <TextField
                onInput={onChatInput}
                value={inputChat}
                id="standard-basic"
                label="New Chat"
                variant="standard"
              />

              <Button
                color="neutral"
                variant="contained"
                onClick={() => newChat()}
              >
                Enter
              </Button>
            </div>
            <h2 style={{ color: "gray" }}>Chats</h2>

            {chats.map((chat) => (
              <div key={chat.id}>
                <ButtonGroup>
                  <Button color="neutral" onClick={() => setChat(chat)}>
                    {chat.name}
                  </Button>
                </ButtonGroup>
              </div>
            ))}
          </div>
          <div style={{ padding: "60px" }}>
            <h2 style={{ color: "darkgray" }}>
              Username: {inputUser || "Class 2023"}
            </h2>
            <h2 style={{ color: "darkgray" }}>
              Chat: {currentChat && currentChat.name}
            </h2>
            <div>
              <TextField
                onInput={onMessageInput}
                value={inputMessage}
                id="standard-basic"
                label="Type message"
                variant="standard"
              />

              <Button
                color="neutral"
                variant="contained"
                onClick={() => postMessage()}
              >
                POST
              </Button>
            </div>
            <div>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.username}: {message.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
