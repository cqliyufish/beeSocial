import React from "react";
import "./sidebar.css";
import { Users } from "dummyData";
import CloseFriend from "components/closeFriend/CloseFriend";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import ChatIcon from "@material-ui/icons/Chat";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import GroupIcon from "@material-ui/icons/Group";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import EventIcon from "@material-ui/icons/Event";
import SchoolIcon from "@material-ui/icons/School";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebaList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sibarListItemText">Feed</span>
          </li>
          <Link
            to="/messenger"
            style={{ color: "black", textDecoration: "none" }}
          >
            <li className="sidebarListItem">
              <ChatIcon className="sidebarIcon" />
              <span className="sibarListItemText">Chats</span>
            </li>
          </Link>
          <li className="sidebarListItem">
            <PlayCircleFilledIcon className="sidebarIcon" />
            <span className="sibarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sibarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sibarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="sibarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className="sidebarIcon" />
            <span className="sibarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="sibarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarIcon" />
            <span className="sibarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}
