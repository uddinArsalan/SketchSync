import { useRef, useState, MouseEvent, useEffect, ChangeEvent } from "react";
import { useMediaQuery } from "react-responsive";
import { LuPalette, LuType, LuUndo, LuSave, LuShare } from "react-icons/lu";
import navLogo from "../assets/logo/sketchsync-high-resolution-logo-black-on-transparent-background.png";
import { useFirebase } from "../context/FirebaseContext";
import "../CSS/draw.css";
import { Link } from "react-router-dom";

const Draw = () => {
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarWidth, setSideBarWidth] = useState<number>(0);
  const [sidebarHeight, setSideBarHeight] = useState<number>(0);
  const { updateImg, myDrawingSet, updateDataToUser } = useFirebase();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current as HTMLCanvasElement;
  const [coordinates, setCoordinates] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });
  const c = canvas?.getContext("2d") as CanvasRenderingContext2D;
  const [color, setColor] = useState("");
  const [imageUrlBlob, setImageUrlBlob] = useState<Blob | null>(null);
  const [strokeWidth, setStrokeWidth] = useState(1.0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stateStack, setStateStack] = useState<ImageData[]>([]);

  const isMobile = useMediaQuery({
    query: "(max-width: 1100px)",
  });

  function drawLine(finalCoordinates: { x: number; y: number }) {
    c?.beginPath();
    c!.strokeStyle = color;
    c.lineWidth = strokeWidth;
    c?.moveTo(coordinates.x || 0, coordinates.y || 0);
    c?.lineTo(finalCoordinates.x, finalCoordinates.y);
    c?.stroke();
  }

  function mouseCoordinates(event: MouseEvent): void {
    if (!isDrawing) return;
    let xPos = event.clientX - canvas.offsetLeft;
    let yPos = event.clientY - -canvas.offsetTop;
    let canvasImage = canvas?.toDataURL();
    updateDataToUser(canvasImage);
    setCoordinates({ x: xPos, y: yPos });
    drawLine({ x: xPos, y: yPos });
  }

  const getColor = (e: ChangeEvent) => {
    setColor((e.target as HTMLInputElement).value);
  };

  function handleMouseDown(e: MouseEvent) {
    setIsDrawing(true);
    setCoordinates({
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - -canvas.offsetTop,
    });
  }

  useEffect(() => {
    if (sidebarRef.current) {
      setSideBarHeight(sidebarRef.current.offsetHeight);
      setSideBarWidth(sidebarRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (!isDrawing) {
      let lastSave = c?.getImageData(0, 0, canvas.width, canvas.height);
      setStateStack((prevData) => [...prevData, lastSave]);
    }
    if (canvas != undefined) {
      let canvasImage = canvas?.toDataURL();
      updateDataToUser(canvasImage);
    }
  }, [isDrawing]);

  function redo() {
    if (stateStack.length > 0) {
      const newUpdatedArray = stateStack.slice(0, -1);
      setStateStack(newUpdatedArray);
      console.log(typeof stateStack[stateStack.length - 2]);
      c?.putImageData(stateStack[stateStack.length - 2] as ImageData, 0, 0);
    }
  }

  const saveDrawing = () => {
    let canvasImage = canvas?.toDataURL();
    myDrawingSet(canvasImage!);
  };

  const PostDrawing = () => {
    let canvasImage = canvas?.toDataURL();
    updateImg(canvasImage);
  };

  useEffect(() => {
    if (canvas) {
      fetch(canvas.toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          setImageUrlBlob(blob);
          // setImageUrl(URL.createObjectURL(blob).replace(/^blob:/, ''))
        });
    }
  }, [canvas, isDrawing]);
  

  // useEffect(() => {
  //   if (imageUrlBlob != null) {
  //     const files = new File([imageUrlBlob], 'sketch.png', { type: imageUrlBlob.type });
  //     setFile(files);
  //   }
  // }, [imageUrlBlob]);

  //URL.createObjectURL().replace(/^blob:/, '')

  const shareOnSocials = () => {
    if (navigator.share && imageUrlBlob) {
      navigator
        .share({
          title: "My Image",
          text: "Check out this awesome Art made my me using SketchSync!",
          files: [
            new File([imageUrlBlob], "sketch.png", { type: imageUrlBlob.type }),
          ],
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported");
    }
  };

  return (
    <div className="draw">
      <button onClick={PostDrawing} className="draw__post-btn">
        Post
      </button>
      <div className="draw__canvas-container"
        onTouchEnd={() => setIsDrawing(false)}
        onTouchCancel={() => setIsDrawing(false)}
        onPointerMove={(e) => mouseCoordinates(e)}
        onPointerDown={(e) => handleMouseDown(e)}
        onPointerUp={() => setIsDrawing(false)}
        onPointerLeave={() => setIsDrawing(false)}
        onMouseMove={(e) => mouseCoordinates(e)}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
      >
        <aside className="draw__sidebar" ref={sidebarRef}>
        <Link to="/">
          <div className="draw__logo-container">
            <img src={navLogo} alt="SketchSync Logo" className="draw__logo" />
          </div>
          </Link>
          <div className="draw__controls">
            <div className="draw__control">
              <label htmlFor="color" className="draw__control-label">
                <LuPalette className="draw__icon" />
                <span>Color</span>
              </label>
              <input
                type="color"
                name="color"
                id="color"
                className="draw__color-picker"
                onChange={(e) => getColor(e)}
              />
            </div>
            <div className="draw__control">
              <label htmlFor="strokeWidth" className="draw__control-label">
                <LuType className="draw__icon" />
                <span>Width</span>
              </label>
              <input
                type="range"
                name="strokeWidth"
                id="strokeWidth"
                min="1"
                max="50"
                className="draw__width-input"
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
              />
            </div>
            <button className="draw__action-btn" onClick={redo}>
              <LuUndo className="draw__icon" />
              <span>Undo</span>
            </button>
            <button className="draw__action-btn" onClick={saveDrawing}>
              <LuSave className="draw__icon" />
              <span>Save</span>
            </button>
            <button className="draw__action-btn" onClick={shareOnSocials}>
              <LuShare className="draw__icon" />
              <span>Share</span>
            </button>
          </div>
        </aside>
        <div className="draw__canvas-wrapper">
          <canvas
            width={isMobile ? window.innerWidth : window.innerWidth - sidebarWidth}
            height={isMobile ? window.innerHeight - sidebarHeight : window.innerHeight}
            className="draw__canvas"
            ref={canvasRef}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Draw;

{
  /* {modal &&
        createPortal(
          <div className="modalBackground">
            <div className="modal">
              <h1 className="modal_heading">Share on Other Platforms</h1>
              <div className="shareIconsGrid">
                <TwitterShareButton
                  url={`https://sketchsync.netlify.app/test`}
                  title={"Check out my recent Drawing made using SketchSync"}
                  hashtags={["Drawing", "SketchSync", "react"]}
                  via="Arsalan_0101"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <FacebookShareButton
                  url={"https://sketchsync.netlify.app"}
                  quote={"Check out my recent Drawing"}
                  hashtag="#drawing"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton
                  url={"https://sketchsync.netlify.app/"}
                  title="My Drawing"
                  summary={"Check out my recent Drawing made using SketchSync"}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <EmailShareButton
                  url={"https://sketchsync.netlify.app/"}
                  subject={"Drawing using SketchSync"}
                  body={"Check Out my drawing made in SketchSync - A real-time collaborative drawing app"}
                >
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <WhatsappShareButton
                  url="https://skectsync.netlify.app/"
                  title="Check Out my drawing made in SketchSync - A real-time collaborative drawing app Link : https://skectsync.netlify.app/test"
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton
                  url="https://skectsync.netlify.app/"
                  title="Check Out my drawing made in SketchSync - A real-time collaborative drawing app"
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
              </div>
            </div>
          </div>,
          document.querySelector("#root") as HTMLElement
        )} */
}
