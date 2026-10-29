import { NewsServices } from "./news.service.js";

const getLiveDispatches = async (req, res) => {
  try {
    const dispatches = await NewsServices.getLiveDispatches();
    res.status(200).json(dispatches);
  } catch (error) {
    console.error("Live wire fetch error:", error);
    res.status(500).json({ error: "Failed to retrieve live telemetry wire." });
  }
};

// Server-Sent Events (SSE) real-time streaming endpoint
const streamDispatches = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write("data: connected to MixHub real-time teleprinter\n\n");
  NewsServices.addSSEClient(res);
};

const createDispatch = async (req, res) => {
  try {
    const newDispatch = await NewsServices.emitNewDispatch(req.body);
    res.status(201).json(newDispatch);
  } catch (error) {
    console.error("Emit dispatch error:", error);
    res.status(500).json({ error: "Failed to emit dispatch." });
  }
};

export const NewsController = {
  getLiveDispatches,
  streamDispatches,
  createDispatch,
};

