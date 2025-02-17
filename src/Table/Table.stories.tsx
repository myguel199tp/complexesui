import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";
import { Buton } from "../Buton/Buton";
import { Button } from "../Button/Button";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Table,
  argTypes: {
    headers: {
      description: "Array of table headers",
      control: { type: "object" },
    },
    rows: {
      description: "Array of table rows (each row is an array of cell values)",
      control: { type: "object" },
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Color variants for the text",
    },
    font: {
      type: "string",
      options: ["bold", "semi", "normal"],
      control: { type: "radio" },
      description: "Font weight",
    },
    size: {
      type: "string",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Size of the text",
    },
    background: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Background color variants",
    },
    padding: {
      type: "string",
      options: ["default", "sm", "md"],
      control: { type: "radio" },
      description: "Padding size",
    },
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Border radius options",
    },
    as: {
      type: "string",
      options: ["table", "div", "section"],
      control: { type: "radio" },
      description: "HTML element to render",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    headers: [
      "Header 1",
      "Header 2",
      "Header 3",
      "Header 4",
      "Header 5",
      "Header 6",
      "Header 7",
      "Header 8",
      "Header 9",
      "Header 10",
    ],
    rows: [
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
    ],

    cellClasses: [
      ["bg-red-100", "bg-red-100", "bg-red-100"],
      ["bg-yellow-100", "bg-purple-100", ""],
      ["", "", "bg-gray-100"],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    colVariant: "primary",
    background: "primary",
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    colVariant: "success",
    background: "success",
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    colVariant: "warning",
    background: "warning",
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    colVariant: "danger",
    background: "danger",
  },
};

export const WithActions: Story = {
  args: {
    headers: ["Name", "Email", "Actions"],
    rows: [
      [
        "John Doe",
        "john.doe@example.com",
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Edit John Doe")}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Delete John Doe")}
          >
            Delete
          </button>
        </div>,
      ],
      [
        "Jane Smith",
        "jane.smith@example.com",
        <div className="flex gap-2">
          <Buton
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Edit Jane Smith")}
          >
            Edit
          </Buton>
          <Button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Delete Jane Smith")}
          >
            Delete
          </Button>
        </div>,
      ],
    ],
    colVariant: "primary",
    font: "normal",
    size: "md",
    background: "success",
    padding: "md",
    rounded: "sm",
    as: "table",
  },
};

export const WithWiderColumns: Story = {
  args: {
    headers: [
      "Header 1",
      "Header 2",
      "Header 3",
      "Header 4",
      "Header 5",
      "Header 6",
      "Header 7",
      "Header 8",
      "Header 9",
      "Header 10",
      "Header 11",
      "Header 12",
      "Header 13",
    ],
    rows: [
      [
        "Row 1, Col 1",
        "Row 1, Col 2",
        "Row 1, Col 3",
        "Row 1, Col 4",
        "Row 1, Col 5",
        "Row 1, Col 6",
        "Row 1, Col 7",
        "Row 1, Col 8",
        "Row 1, Col 9",
        "Row 1, Col 10",
        "Row 1, Col 11",
      ],
      [
        "Row 2, Col 1",
        "Row 2, Col 2",
        "Row 2, Col 3",
        "Row 2, Col 4",
        "Row 2, Col 5",
        "Row 2, Col 6",
        "Row 2, Col 7",
        "Row 2, Col 8",
        "Row 2, Col 9",
        "Row 2, Col 10",
      ],
      [
        "Row 3, Col 1",
        "Row 3, Col 2",
        "Row 3, Col 3",
        "Row 3, Col 4",
        "Row 3, Col 5",
        "Row 3, Col 6",
        "Row 3, Col 7",
        "Row 3, Col 8",
        "Row 3, Col 9",
        "Row 3, Col 10",
      ],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
    cellClasses: [
      ["w-[200px]", "", "", "w-[300px]", "", "", "", "", "", ""],
      ["w-[200px]", "", "", "w-[300px]", "", "", "", "", "", ""],
      ["w-[200px]", "", "", "w-[300px]", "", "", "", "", "", ""],
    ],
  },
};
