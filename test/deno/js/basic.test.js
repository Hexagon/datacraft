import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { DataSet } from "../../../src/datacraft.js";

Deno.test("New dataset should not throw", () => {
  let data = new DataSet();
});
