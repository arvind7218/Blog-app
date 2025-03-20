/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "90%",
    maxWidth: "1200px",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
    maxWidth: "800px",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  imageWrapper: {
    width: "100%",
    maxHeight: "400px",
    overflow: "hidden",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blogImage: {
    width: "100%",
    height: "auto",
    maxHeight: "400px",
    objectFit: "contain", // Prevents distortion
    borderRadius: "12px",
  },
  noBlogsMessage: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginTop: "20px",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    if (!id) return; // Prevent making API calls if user ID is missing

    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user blogs:", error);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) setUser(data.user);
    });
  }, [id]); // Add `id` as a dependency to re-fetch when it changes

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      const updatedData = await sendRequest();
      if (updatedData) setUser(updatedData.user);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className={classes.container}>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blogs
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              imageURL={blog.image}
              userName={user.name}
            />
            {blog.image && (
              <div className={classes.imageWrapper}>
                <img
                  className={classes.blogImage}
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
            )}
            <DeleteButton blogId={blog._id} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p className={classes.noBlogsMessage}>No blogs found.</p>
      )}
    </div>
  );
};

export default UserBlogs;
