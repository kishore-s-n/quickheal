import React, { useEffect, useRef, useState } from "react";
import rtcmanager from "../core/RTCManager";
import { socket } from "../utils/socket";

const ConnectionType = {
  DOCTOR: "doctor",
  PATIENT: "patient",
};

function Meet() {
  const [message, setMessage] = useState("");
  const localRef = useRef();
  const remoteRef = useRef();

  useEffect(() => {
    socket.on("patient:message", (data) => {
      setMessage(data);
    });
    socket.on("doctor:message", (data) => {
      setMessage(data);
    });
    socket.on("answerResponse", async (offerObj) => {
      console.log(offerObj);
      await rtcmanager.addAnswer(offerObj);
    });

    socket.on("receivedIceCandidateFromServer", (iceCandidate) => {
      rtcmanager.addNewIceCandidate(iceCandidate);
      console.log(iceCandidate);
    });
  }, [socket]);

  useEffect(() => {
    const { id, connectionType } = JSON.parse(
      window.localStorage.getItem("data")
    );

    (async () => {
      if (connectionType === ConnectionType.PATIENT) {
        const { localStream, remoteStream } = await rtcmanager.call(id);
        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;
      } else if (connectionType === ConnectionType.DOCTOR) {
        localRef.current.srcObject = rtcmanager.getStream().localStream;
        remoteRef.current.srcObject = rtcmanager.getStream().remoteStream;
      }
    })();
  }, []);

  return (
    <div>
      <div id="waiting" class="btn btn-warning">
        {message}
      </div>
      <video ref={localRef} autoplay playsinline controls></video>
      <video ref={remoteRef} autoplay playsinline controls></video>
    </div>
  );
}

export default Meet;
