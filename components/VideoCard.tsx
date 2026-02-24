import React,  {useState, useEffect, useCallback} from "react"
import {getCldImageUrl, getCldVideoUrl} from "next-cloudinary"
import {Download, Clock, FileDown, FileUp} from "lucide-react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {filesize} from "filesize";

dayjs.extend(relativeTime)

interface VideoCardProps {
    video : Video;
    onDownload: (url: string, title : string) => void;

    
}


export const VideoCard = () => {
  return (
    <div>VideoCard</div>
  )
}
