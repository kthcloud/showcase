import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://showcase-websockets-backend.app.cloud.cbh.kth.se/test"
    );
    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      setNumbers((numbers) => [...numbers, event.data]);
    });

    return () => {
      console.log("closing websocket");
      socket.close();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>websockets showcase on kthcloud</h1>
      <a href="https://github.com/kthcloud/showcase">see the code</a>
      <p>
        {numbers.map((number, index) => (
          <span key={"number-" + index}>{number + " "}</span>
        ))}
      </p>
    </>
  );
}

export default App;
