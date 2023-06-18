import merge from "webpack-merge";
import { Configuration } from "webpack";

import common from "./webpack.common";

const config: Configuration = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
});

console.log(config);

export default config;
