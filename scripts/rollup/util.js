import path from "path";
import fs from "fs";
import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

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

export function getBaseRoLlupPlugins({
  alias = {
    __DEV__: true,
  },
  typescript = {},
} = {}) {
  return [replace(alias), cjs(), ts(typescript)];
}
