import "../style/style.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../app/app";

const content = document.getElementById("content");
const root = createRoot(content);

root.render(App());

