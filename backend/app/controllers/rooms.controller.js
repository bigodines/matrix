import fs from "fs";
import uuid from "uuid/v4";
import path from "path";

const roomFilePath = "../file/matrix.room.web.json";

const fetchFromFile = () => {
  const roomFileExists = fs.existsSync(roomFilePath);
  if (!roomFileExists) {
    createRoomFileSync();
  }

  const roomsData = fs.readFileSync(roomFilePath);
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const createRoomFileSync = () => {
  const roomsData = [
    {
      id: uuid(),
      name: "Lobby",
      disableMeeting: true,
    },
    {
      id: uuid(),
      name: "Lounge",
      externalMeetUrl: "https://meet.google.com/sof-bqhr-szg"
    },
    {
      id: uuid(),
      name: "1:1 A",
      externalMeetUrl: "https://meet.google.com/ohj-rpuq-vgb"
    },
    {
      id: uuid(),
      name: "1:1 B",
      externalMeetUrl: "https://meet.google.com/dpn-ibch-pwq"
    },
    {
      id: uuid(),
      name: "1:1 C",
      externalMeetUrl: "https://meet.google.com/yhr-evcy-iqw"
    },
    {
      id: uuid(),
      name: "Wringley",
      externalMeetUrl: "https://meet.google.com/zwb-ypyy-ywc"
    },
    {
      id: uuid(),
      name: "War Room",
      externalMeetUrl: "https://meet.google.com/ynk-kkbh-tdn"
    },
    {
      id: uuid(),
      name: "Candlestick",
      externalMeetUrl: "https://meet.google.com/vjg-eyan-ifc"
    },
    {
      id: uuid(),
      name: "Kitchen",
      externalMeetUrl: "https://meet.google.com/igg-qjez-xnc"
    },
    {
      id: uuid(),
      name: "Engineering",
      externalMeetUrl: "https://meet.google.com/oic-kamz-apx"
    },
  ];


  const niceNames = [
//    "Lounge",
//    "1:1 A",
//    "1:1 B",
//    "1:1 C",
//    "Wringley",
//    "Candlestick",
//    "War Room",
//    "Jams",
//    "Coliseum",
//    "Crystal Ballroom",
//    "Engineering",
  ];

  for (const niceName of niceNames) {
    roomsData.push({
      id: uuid(),
      name: niceName
    });
  }

  fs.mkdirSync(path.dirname(roomFilePath), { recursive: true });
  fs.writeFileSync(roomFilePath, JSON.stringify(roomsData));
};

const fetchFromEnvironment = (env) => {
  const roomsData = env.ROOMS_DATA;
  const roomsDetail = JSON.parse(roomsData);

  return new Promise(resolve => resolve(roomsDetail));
};

const fetchRooms = (strategy) => {
  switch (strategy) {
    // TODO add suport to fetch from endpoint
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);
    default:
      return fetchFromFile();
  }
};

export default fetchRooms;
