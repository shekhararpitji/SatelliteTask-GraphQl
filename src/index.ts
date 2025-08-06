import { schema } from "./graphQl/index";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import roleRoutes from "./routes/roleRoutes";
import channelRoutes from "./routes/channelRoutes";
import packRoutes from "./routes/packRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import { appDataSource } from "./dataSource";
import { graphqlHTTP } from "express-graphql";
import("./utils/schedule");

import postmanToOpenApi from "postman-to-openapi";
import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { reqContext } from "./graphQl/context";

const port = process.env.PORT ?? 8080;
const app = express();
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());
app.use("/600/dth/role", roleRoutes);
app.use("/600/dth/channel", channelRoutes);
app.use("/600/dth/package", packRoutes);
app.use("/600/dth/subscribe", subscriptionRoutes);

app.use(
  "/graphql",
  graphqlHTTP({ schema, context: reqContext, graphiql: true })
);

postmanToOpenApi("src/postman/DTH.json", path.join("src/postman/swagger.yml"), {
  defaultTag: "General",
}).then(() => {
  let result = YAML.load("src/postman/swagger.yml");
  result.servers[0].url = "/";
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(result));
});

appDataSource
  .initialize()
  .then(() => {
    console.log("mysql connected");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
