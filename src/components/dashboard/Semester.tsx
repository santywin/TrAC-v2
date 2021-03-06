import React, { FC, memo, useContext } from "react";

import { Stack, Text } from "@chakra-ui/core";

import { ICourse } from "../../../interfaces";
import { ConfigContext } from "../Config";
import { CourseBox } from "./CourseBox";

const toRoman = (num: number, first = false): string => {
  if (first && num === 0) {
    return "-";
  }
  if (num < 1) {
    return "";
  }
  if (num >= 40) {
    return "XL" + toRoman(num - 40);
  }
  if (num >= 10) {
    return "X" + toRoman(num - 10);
  }
  if (num >= 9) {
    return "IX" + toRoman(num - 9);
  }
  if (num >= 5) {
    return "V" + toRoman(num - 5);
  }
  if (num >= 4) {
    return "IV" + toRoman(num - 4);
  }
  if (num >= 1) {
    return "I" + toRoman(num - 1);
  }
  return "";
};

export const Semester: FC<{ courses: ICourse[]; n: number }> = memo(
  ({ courses: semester, n }) => {
    const { SEMESTER_HEADER_TEXT_COLOR } = useContext(ConfigContext);
    return (
      <Stack>
        <Text
          color={SEMESTER_HEADER_TEXT_COLOR}
          textAlign="center"
          fontSize="1.5em"
        >
          <b>{toRoman(n, true)}</b>
        </Text>
        {semester.map((course, key) => (
          <CourseBox key={key} {...course} />
        ))}
      </Stack>
    );
  }
);
