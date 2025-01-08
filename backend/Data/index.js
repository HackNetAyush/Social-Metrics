const express = require("express");
const LangflowClient = require("./langflowClient");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());

const baseURL = "https://api.langflow.astra.datastax.com";

const applicationToken = process.env.APP_TOKEN;
const langflowId = process.env.LANGFLOW_ID;
const flowIdOrName = process.env.FLOW_ID;

const langflowClient = new LangflowClient(baseURL, applicationToken);

// Endpoint to trigger a flow
app.post("/trigger-flow", async (req, res) => {
  const { inputValue, inputType, outputType } = req.body;

  //   if (!inputValue) {
  //     return res.status(400).json({ error: "inputValue is required" });
  //   }

  try {
    // Call the Langflow API without tweaks and with stream set to false
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue || "",
      inputType || "chat", // Default inputType to 'chat'
      outputType || "chat", // Default outputType to 'chat'
      {}, // No tweaks
      false, // Set stream to false
      (data) => console.log("Received:", data.chunk), // onUpdate (for streaming, though stream is false)
      (message) => console.log("Stream Closed:", message), // onClose
      (error) => console.log("Stream Error:", error) // onError
    );

    const flowOutputs = response.outputs[0];
    const firstComponentOutputs = flowOutputs.outputs[0];
    const output = firstComponentOutputs.outputs.message;

    return res.json({ output: JSON.parse(output.message.text) });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to run flow" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
