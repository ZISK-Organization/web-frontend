import React from "react";
import DiscussionPost from "./DiscussionPost";

interface IProps {
  thread: any;
}

export default function DiscussionThread({ thread }: IProps) {
  return (
    <>
      <br />
      {thread.posts.map((post: any) => (
        <DiscussionPost post={post} />
      ))}
    </>
  );
}
