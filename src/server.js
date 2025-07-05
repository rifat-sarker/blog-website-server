import app from "./app";

const main = async () => {
  try {
    app.listen(5000, () => {
      console.log(`Server is running on port 5000}`);
    });
  } catch (error) {
    console.log("Error connecting to the server", error);
  }
};

main();
