import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function HomePage() {
  const [posts, setPost] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPost(posts.documents);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <>
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  {authStatus ? "There are no posts" : "Login to read posts"}
                </h1>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }

  if (posts) {
    return (
      <>
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => {
                console.log(post)
                return (
                  <div key={post.$id} className="p-2 w-1/4">
                    <PostCard {...post} />
                  </div>
                )
              })}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default HomePage;
