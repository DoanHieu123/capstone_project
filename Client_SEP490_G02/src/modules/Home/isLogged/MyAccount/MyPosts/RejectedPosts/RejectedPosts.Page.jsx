import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Delete } from "@mui/icons-material";
import secureLocalStorage from "react-secure-storage";
import { LoadingButton } from "@mui/lab";
import { getAllPostByAccountId } from "../../../../Home.Api";
import { themeColors } from "../../../../../../themes/schemes/PureLightThem";
import DeletePostModal from "../../../Modal/DeletePost/DeletePost.Modal";
import { URL_IMAGE } from "../../../../../../services/ApiUrl";
import { filterPostsRejected } from "../../../../../../utils/filter";
import RejectedPostModal from "../../../Modal/RejectedPost/RejectedPost.Modal";
import { AssetImages } from "../../../../../../utils/images";

const RejectedPostsPage = () => {
  const onTopRef = useRef(null);

  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const listRejected = filterPostsRejected(data);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = listRejected?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPagePost = Math.ceil(listRejected?.length / postsPerPage);

  const paginate = (event, value) => {
    event.preventDefault();
    setCurrentPage(value);
    if (onTopRef.current) {
      onTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const init = async () => {
    const res = await getAllPostByAccountId(
      secureLocalStorage.getItem("accountId")
    );

    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    init();
  }, [data]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setFetchData(true);
    }, 5000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <>
      {fetchData ? (
        <Box
          display="flex"
          flexWrap="wrap"
          gap="1rem"
          alignItems="center"
          ref={onTopRef}
        >
          {currentPost?.map((post) => (
            <Box
              sx={{
                width: "335px",
                boxShadow: themeColors.boxShadow,
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: themeColors.boxShadowHover,
                },
              }}
              key={post?.blogID}
              borderRadius="8px"
              bgcolor={themeColors.white}
              position="relative"
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: 10,
                  bgcolor: themeColors.button_Secondary,
                  p: "5px 10px",
                  borderRadius: "0 6px 6px 0",
                  color: themeColors.white,
                }}
              >
                {post?.status}
              </Typography>

              <DeletePostModal data={{ id: post?.blogID, title: post?.title }}>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    color: themeColors.white,
                  }}
                >
                  <Delete />
                </IconButton>
              </DeletePostModal>
              <RejectedPostModal data={{ reason: post?.reasonReject }}>
                <Box width="100%" sx={{ cursor: "pointer" }}>
                  <img
                    loading="lazy"
                    src={`${URL_IMAGE}${post?.blogImage[0]?.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      minHeight: "272px",
                      maxHeight: "272px",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    p="10px 15px"
                  >
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        transition: "-webkit-line-clamp 0.1s",
                        userSelect: "none",
                      }}
                    >
                      {post?.title}
                    </Typography>
                    <Typography
                      sx={{
                        width: "fit-content",
                        fontSize: 16,
                        border: `1px solid ${themeColors.primary_Default}`,
                        p: "5px 15px",
                        borderRadius: "6px",
                      }}
                    >
                      {post?.location}
                    </Typography>
                    <Box display="flex" gap="1rem" alignItems="center">
                      {post?.account?.avatar ? (
                        post?.account?.avatar?.startsWith("/", 0) ? (
                          <Avatar
                            src={`${URL_IMAGE}${post?.account?.avatar}`}
                            sx={{
                              pointerEvents: "none",
                            }}
                          />
                        ) : (
                          <Avatar
                            src={post?.account?.avatar}
                            sx={{
                              pointerEvents: "none",
                            }}
                          />
                        )
                      ) : (
                        <img
                          src={AssetImages.ICONS.USER}
                          alt=""
                          style={{
                            width: 30,
                            height: 30,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <Typography>{post?.account?.fullname}</Typography>
                    </Box>
                  </Box>
                </Box>
              </RejectedPostModal>
            </Box>
          ))}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "20px",
            }}
          >
            {listRejected?.length > 0 && (
              <Grid item xs={6} sx={{ alignItems: "center" }}>
                <label>
                  <b>
                    Showing {currentPage} of {totalPagePost}{" "}
                    {totalPagePost > 1 ? "pages" : "page"}
                  </b>
                </label>
              </Grid>
            )}
            <Stack sx={{ alignItems: "center" }}>
              {listRejected?.length > 0 && (
                <Pagination
                  color="standard"
                  variant="outlined"
                  defaultPage={1}
                  count={totalPagePost}
                  page={currentPage}
                  onChange={paginate}
                  size="medium"
                  showFirstButton
                  showLastButton
                />
              )}
            </Stack>

            {listRejected?.length === 0 && (
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="5px 0"
              >
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 400,
                  }}
                >
                  No post found!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          width="100%"
          p="20px 60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LoadingButton
            loading
            variant="outlined"
            sx={{ border: "0 !important" }}
          />
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            Loading...
          </Typography>
        </Box>
      )}
    </>
  );
};

export default RejectedPostsPage;
