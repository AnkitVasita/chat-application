import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";
import MenuIcon from "@material-ui/icons/Menu";
import db from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../reducer";
import UseWindowDimensions from "../../hooks/useWindowDimensions";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Loader from "../loader/Loader";
import { useHistory } from "react-router-dom";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [sidebarBool, setsidebarBool] = useState(true);
  const [{ togglerState }, dispatch] = useStateValue();
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState("");
  const [logout, setLogout] = useState(false);
  const { width } = UseWindowDimensions();
  const history = useHistory();

  const matcher = (s, values) => {
    const re = RegExp(`.*${s.toLowerCase().split("").join(".*")}.*`);
    return values.filter((v) => v.data.name.toLowerCase().match(re));
  };

  const handleChange = (e) => {
    setsidebarBool(false);
    setInput(e.target.value);
  };

  const exitApp = () => {
    localStorage.removeItem("uid");
    history.push("/");
    window.location.reload();
    setLogout(true);
  };

  useEffect(() => {
    if (rooms.length > 0) {
      setSearch(matcher(input, rooms));
    }
    if (input === "") {
      setsidebarBool(true);
    }
  }, [input, rooms]);

  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setToggler(!toggler);
  }, [togglerState]);

  const handleDrawerToggle = () => {
    setToggler(toggler);

    dispatch({
      type: actionTypes.SET_TOGGLER,
      togglerState: togglerState + 1,
    });
  };

  const photoURL =
    localStorage.getItem("photoURL") !== ""
      ? localStorage.getItem("photoURL")
      : null;

  const displayName = localStorage.getItem("displayName");

  return (
    <>
      {width < 629 ? (
        <div
          className={
            togglerState % 2 !== 0 ? "sidebar" : "sidebar hide__sidebar"
          }
        >
          <div className="siderbar__wrapper">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className="sidebar__burger"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <div className="sidebar__header">
              <Avatar src={photoURL} />{" "}
              <p className="sidebar__greeting mobile__tag">{displayName}</p>
              <div className="sidebar__headerRight">
                <IconButton>
                  <DonutLargeIcon />
                </IconButton>
                <IconButton>
                  <ChatIcon />
                </IconButton>
                <IconButton>
                  <div onClick={exitApp}>
                    <ExitToAppIcon />
                  </div>
                </IconButton>
              </div>
            </div>
          </div>
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input
                placeholder="Search or Start a new chat"
                value={input}
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          {sidebarBool ? (
            <div className="sidebar__chats">
              <SidebarChat addNewChatVal="true" />
              {rooms.length === 0 ? (
                <Loader />
              ) : (
                rooms.map((room) => (
                  <SidebarChat
                    key={room.id}
                    id={room.id}
                    name={room.data.name}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="sidebar__chats">
              <SidebarChat addNewChatVal="true" />
              {search.map((room) => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={"sidebar"}>
          <div className="sidebar__header">
            <Avatar src={photoURL} />{" "}
            <p className="sidebar__greeting" style={{ color: "black" }}>
              {" "}
              {displayName}
            </p>
            <div className="sidebar__headerRight">
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
              <IconButton>
                <ChatIcon />
              </IconButton>
              <IconButton>
                <div onClick={exitApp}>
                  <ExitToAppIcon />
                </div>
              </IconButton>
            </div>
          </div>
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input
                placeholder="Search or Start a new chat"
                value={input}
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>
          {sidebarBool ? (
            <div className="sidebar__chats scrollbar-juicy-peach">
              <SidebarChat addNewChatVal="true" />
              {rooms.length === 0 ? (
                <Loader />
              ) : (
                rooms.map((room) => (
                  <SidebarChat
                    key={room.id}
                    id={room.id}
                    name={room.data.name}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="sidebar__chats ">
              <SidebarChat addNewChatVal="true" />
              {search.map((room) => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Sidebar;
