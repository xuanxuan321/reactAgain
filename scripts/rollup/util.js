import path from "path";
import fs from "fs";
import ts from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

const pkgPath = path.resolve(__dirname, "../../packages");
const distPath = path.resolve(__dirname, "../../dist/node_modules");

export function resolvePackagePath(packageName, isDist) {
  if (isDist) {
    return `${distPath}/${packageName}`;
  }
  return `${pkgPath}/${packageName}`;
}

export function getPkgJson(packageName) {
  const path = `${resolvePackagePath(packageName)}/package.json`;
  const str = fs.readFileSync(path, "utf-8");
  return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [commonjs(), ts(typescript)];
}
