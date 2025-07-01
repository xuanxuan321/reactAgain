import { resolvePackagePath, getPkgJson, getBaseRollupPlugins } from "./util";
import generatePackageJson from "rollup-plugin-generate-package-json";

const { name, module } = getPkgJson("react");

// react包的路径
const pkgPath = resolvePackagePath(name);

// react产物的路径
const distPath = resolvePackagePath(name, true);

export default [
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${distPath}/index.js`,
      format: "umd",
      name: "index.js",
    },
    plugins: [
      ...getBaseRollupPlugins({}),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: distPath,
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: "./index.js",
        }),
      }),
    ],
  },
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      {
        file: `${distPath}/jsx-runtime.js`,
        format: "umd",
        name: "jsx-runtime.js",
      },
      {
        file: `${distPath}/jsx-dev-runtime.js`,
        format: "umd",
        name: "jsx-dev-runtime.js",
      },
    ],
    plugins: getBaseRollupPlugins({}),
  },
];
