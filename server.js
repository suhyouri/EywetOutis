const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// 정적 파일 서빙
app.use(express.static(__dirname));

// API: 이미지 폴더의 파일 목록 반환
app.get("/api/list-files", (req, res) => {
  const imagesDir = path.join(__dirname, "images");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.json([]);
    }

    // png, jpg, mp4 파일만 필터링
    const mediaFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".png", ".jpg", ".jpeg", ".mp4", ".webm"].includes(ext);
    });

    // 파일명 정렬
    mediaFiles.sort();

    res.json(mediaFiles);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 시작되었습니다: http://localhost:${PORT}`);
  console.log("종료하려면 Ctrl+C를 누르세요");
});
