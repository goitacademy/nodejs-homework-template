import express from "express";

import http from "http";
import https from "https";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello - ${req.protocol}`);
});

const options = {
  key: xxx,
  cert: xxx,
};

//certbot