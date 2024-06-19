'use client'

import { useEffect, useState } from "react";
import ReactPlayer from "react-player"

const RenderYoutubeVideo = ({ url }: any) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ReactPlayer url={url}
      controls
    />
  )
}

export default RenderYoutubeVideo