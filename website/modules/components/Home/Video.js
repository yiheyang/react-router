import React from "react";
import { Block } from "jsxstyle";
import { DARK_GRAY } from "../../Theme";

const Video = () => (
  <Block background={DARK_GRAY} color="white" padding="80px 0">
    <Block
      height="45vw"
      width="80vw"
      margin="auto"
      background={DARK_GRAY}
      boxShadow="0px 10px 30px hsla(0, 0%, 0%, 0.5)"
    >
      <iframe height="100%" width="100%" src='http://player.youku.com/embed/XMzExMzg3NDQyMA==' frameborder="0" allowfullscreen="true"></iframe>
    </Block>
  </Block>
);

export default Video;
