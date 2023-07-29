import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import SubItem from "./SubItem.jsx";
import SubItemInsight from "./SubItemInsight.jsx";
import DealIcon from "../svg/dealIcon.svg";
import InsightIcon from "../svg/insighticon.svg";
import BurnCodeIcon from "../svg/burnCode.svg";
import ProfileIcon from "../svg/profileIcon.svg";
import SideBarSelect from "../svg/sideBarSelect.svg";
import Threedots from "../svg/threedots.svg";
import { useStore } from "@/lib/context/sidebar_context/store.js";
import { useStore as useStoreOwner } from "@/lib/context/user_context/store.js";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchRestaurantId } from "@/lib/fetching/restaurant/restaurant_id/data";
// import { sub } from "date-fns";
// import { set } from "mongoose";

function SideBarItem() {
  const [hash, setHash] = useState(window.location.hash.split("#")[1]);
  console.log(hash);

  useEffect(() => {
    setHash(window.location.hash.split("#")[1]);
  }, []);
  // const { data: session, status } = useSession();
  const {
    restaurantOwnerId,
    restaurantId,
    setRestaurantOwner,
    setRestaurantId,
  } = useStoreOwner();
  const { sideBarItemActive, setSideBarItemActive } = useStore();
  const pathname = usePathname();
  console.log("This is the pathname: ", pathname.split("/")[4]);
  useEffect(() => {
    const getRestaurantId = async () => {
      if (!restaurantOwnerId) {
        setRestaurantOwner(pathname.split("/")[4]);
        const data = await fetchRestaurantId(pathname.split("/")[4]);
        setRestaurantId(data.restaurantId);
      } else {
        const data = await fetchRestaurantId(restaurantOwnerId);
        setRestaurantId(data.restaurantId);
      }
    };

    getRestaurantId();
  }, []);
  const theme = useTheme();
  const router = useRouter();
  const shadowColor = `${theme.palette.neutral[20]}1f`;

  const navItems = [
    {
      text: "Campaigns",
      icon: <DealIcon />,
      subMenuCampaigns: [
        {
          text: "Ongoing",
          link: `/dashboard/campaigns/active/${restaurantOwnerId}/#ongoing`,
        },
        {
          text: "Upcoming",
          link: `/dashboard/campaigns/active/${restaurantOwnerId}/#upcoming`,
        },
      ],
      // link: `/dashboard/campaigns/active/${restaurantOwnerId}/#ongoing`,
    },
    {
      text: "Insights",
      icon: <InsightIcon />,
      subMenuInsights: [
        {
          text: "Overview",
          link: `/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`,
        },
        {
          text: "Campaigns",
          link: `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId}`,
        },
        {
          text: "Customers",
          link: `/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`,
        },
      ],
      // link: `/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`,
    },
    {
      text: "Burn a Code",
      icon: <BurnCodeIcon />,
      link: `/dashboard/burnCode/${restaurantOwnerId}`,
    },
    {
      text: "Other",
      icon: <Threedots />,
      link: `/dashboard/profile/${restaurantOwnerId}`,
    },
  ];

  const campaignSubItems = [
    {
      text: "Ongoing",
      link: `/dashboard/campaigns/active/${restaurantOwnerId}/#ongoing`,
    },
    {
      text: "Upcoming",
      link: `/dashboard/campaigns/active/${restaurantOwnerId}/#upcoming`,
    },
  ];

  const insightSubItems = [
    {
      text: "Overview",
      link: `/dashboard/insights/overview/${restaurantOwnerId}/${restaurantId}`,
    },
    {
      text: "Campaigns",
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/campaigns/${restaurantOwnerId}/${restaurantId} `,
    },
    {
      text: "Customers",
      // WRONG WAITNG FOR RESTAURANTID TO RESOVLE
      link: `/dashboard/insights/customers/${restaurantOwnerId}/${restaurantId}`,
    },
  ];

  useEffect(() => {
    setSideBarItemActive(pathname.substring(1));
  }, [pathname]);

  const [openSubMenuCampaigns, setOpenSubMenuCampaigns] = useState(false);
  const [openSubMenuInsights, setOpenSubMenuInsights] = useState(false);

  return (
    <>
      <List
        sx={{
          padding: "0",
          display: "flex",
          justifyContent: "center",
          // flexFlow: "column wrap"
          // height: "80px",
        }}
      >
        {navItems.map(
          ({ text, icon, link, subMenuCampaigns, subMenuInsights }) => {
            const activeLink = `${link}`.substring("1");
            const activeLinkSplit = activeLink.split("/");
            const currentURL = pathname.split("/");
            return (
              <ListItem
                key={text}
                style={{
                  // flexGrow:"1",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
              >
                {openSubMenuCampaigns == true && subMenuCampaigns != null ? (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "150%",
                      left: "40%",
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "8px",
                      padding: ".5rem",
                      boxShadow: `0px 4px 20px ${shadowColor}`,
                    }}
                  >
                    <List>
                      {subMenuCampaigns.map(({ text, link }) => {
                        return (
                          <ListItem
                            key={text}
                            style={{
                              padding: "0",
                            }}
                          >
                            <ListItemButton
                              onClick={() => {
                                router.push(`${link}`);
                                setOpenSubMenuCampaigns(false);
                                setSideBarItemActive(activeLink);
                                setHash(
                                  hash == "ongoing" ? "upcoming" : "ongoing"
                                );
                              }}
                            >
                              {(console.log("hash"),console.log(hash),console.log("link"),
                              console.log(link.substring("1").split("/")[4].split("#")[1]))}
                              <ListItemText>
                                <Typography
                                  sx={{
                                    borderBottom:
                                      hash == link.substring("1").split("/")[4].split("#")[1]
                                        ? `.15rem solid ${theme.palette.primary[80]}`
                                        : "none",
                                  }}
                                >
                                  {text}
                                </Typography>
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : null}
                {openSubMenuInsights == true && subMenuInsights != null ? (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "150%",
                      left: "40%",
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "8px",
                      padding: ".5rem",
                      boxShadow: `0px 4px 20px ${shadowColor}`,
                    }}
                  >
                    <List>
                      {subMenuInsights.map(({ text, link }) => {
                        return (
                          <ListItem
                            key={text}
                            style={{
                              padding: "0",
                            }}
                          >
                            <ListItemButton
                              onClick={() => {
                                router.push(`${link}`);
                                setOpenSubMenuInsights(false);
                                setSideBarItemActive(activeLink);
                              }}
                            >
                              <ListItemText>
                                <Typography
                                  sx={{
                                    borderBottom:
                                      currentURL[3] == text.toLowerCase()
                                        ? `2px solid ${theme.palette.primary[80]}`
                                        : "none",
                                  }}
                                >
                                  {text}
                                </Typography>
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                ) : null}

                <ListItemButton
                  onClick={() => {
                    if (subMenuCampaigns != null) {
                      setOpenSubMenuCampaigns(!openSubMenuCampaigns);
                      setOpenSubMenuInsights(false);
                      console.log("submenuCampaigns exist");
                    } else if (subMenuInsights != null) {
                      setOpenSubMenuInsights(!openSubMenuInsights);
                      setOpenSubMenuCampaigns(false);
                      console.log("submenuCampaigns exist");
                    } else {
                      setOpenSubMenuInsights(false);
                      setOpenSubMenuCampaigns(false);
                      router.push(`${link}`);
                      setSideBarItemActive(activeLink);
                    }
                  }}
                  sx={
                    {
                      // backgroundColor:
                      // currentURL[2] === activeLinkSplit[1]
                      //     ? theme.palette.primary[120]
                      //     : "transparent",
                      // padding: "0 2rem",
                      // position: "relative",
                    }
                  }
                >
                  {(currentURL[2] === activeLinkSplit[1] ||
                    currentURL[2] === text.toLowerCase()) && (
                    <SideBarSelect
                      style={{
                        position: "absolute",
                        left: "25%",
                        zIndex: "-10",
                      }}
                    ></SideBarSelect>
                  )}
                  <ListItemIcon
                    sx={{
                      // marginRight: ".5rem",
                      color: theme.palette.background.alt,
                      // minWidth: "auto",
                      fontSize: "2rem",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                </ListItemButton>
                {/* {currentURL[2] === activeLinkSplit[1] &&
                currentURL[2] == `campaigns` && (
                  <SubItem list={campaignSubItems}></SubItem>
                )} */}

                {/* {currentURL[2] === activeLinkSplit[1] &&
                currentURL[2] == `insights` && (
                  <SubItemInsight list={insightSubItems}></SubItemInsight>
                )} */}
              </ListItem>
            );
          }
        )}
      </List>
    </>
  );
}

export default SideBarItem;
