import { Helmet } from "react-helmet";
import { useRef, useState, useEffect } from "react";
import heic2any from 'heic2any'

function loadImage(file, callBack) {
  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    const data = e.target.result;
    callBack(data);
  });
  reader.readAsDataURL(file);
}

function drawToCanvas(canvas, image) {
  const ctx = canvas.getContext("2d");
  const img = new window.Image();
  img.onload = (e) => {
    const height = e.target.height;
    const width = e.target.width;
    canvas.height = height;
    canvas.width = width;

    ctx.drawImage(e.target, 0, 0, width, height); // Or at whatever offset you like
  };
  img.setAttribute("src", image);
}

function downloadImage(dataURI, extention) {
  const a = document.createElement("a");
  a.href = dataURI;
  a.download = `output.${extention}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function PngToJpeg() {
  const [image, setImage] = useState();
  const canvasRef = useRef();
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      drawToCanvas(canvas, image);
    }
  }, [image]);
  return <div>
    <input type="file" onChange={(event) => {
      const file = event.target.files[0];
      loadImage(file, setImage);
    }} />
    <canvas ref={canvasRef} style={{ display: image ? "block" : "none", maxWidth: "40%" }}></canvas>
    <button onClick={() => {
      const canvas = canvasRef.current;
      downloadImage(canvas.toDataURL("image/jpeg"), "jpeg");
    }}>convert</button>
  </div>
}

function HeicToPng() {
  const [image, setImage] = useState();
  const canvasRef = useRef();
  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      drawToCanvas(canvas, image);
    }
  }, [image]);
  return <div>
    <input type="file" onChange={(event) => {
      const file = event.target.files[0];

      loadImage(file, (blob) => {
        console.log(heic2any(blob));
      });
    }} />
    <canvas ref={canvasRef} style={{ display: image ? "block" : "none", maxWidth: "40%" }}></canvas>
    <button onClick={() => {
      const canvas = canvasRef.current;
      downloadImage(canvas.toDataURL("image/jpeg"), "jpeg");
    }}>convert</button>
  </div>
}

function JpegToPng() {
  const [image, setImage] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      drawToCanvas(canvas, image);
    }
  }, [image]);

  return (
    <>
      <input
        onChange={function (event) {
          const file = event.target.files[0];
          loadImage(file, setImage);
        }}
        type="file"
        id="img"
        name="img"
        accept="image/*"
      />

      {
        <canvas
          style={{ display: image ? "block" : "none", maxWidth: "40%" }}
          ref={canvasRef}
        ></canvas>
      }

      <button
        onClick={() => {
          const canvas = canvasRef.current;
          downloadImage(canvas.toDataURL("image/png"), "png");
        }}
      >
        convert
      </button>
    </>
  );
}


export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Create App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5895424026455875"
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <main>
        <h1>Jpeg to png</h1>
        <JpegToPng />
        <h1>png to jpeg</h1>
        <PngToJpeg />
        <h1>heic to png</h1>
        <HeicToPng />
      </main>
    </div>
  );
}
