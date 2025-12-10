import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";
import { ReactNextPlayer } from "reactnextplayer";

const IntroVideoCell = ({ videoUrl }: { videoUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        {videoUrl ? (
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Video size={22} />
          </button>
        ) : (
          <span className="text-gray-400">No intro video added</span>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Intro Video</DialogTitle>
          </DialogHeader>
          <ReactNextPlayer
            src={videoUrl}
            controls
            autoplay={true}
            muted={false}
            loop={false}
            height={345}
            width="100%"
            contextMenu={false}
            //   className="w-full rounded-2xl"
            color="#ff0000"
            ambientGlow
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IntroVideoCell;
