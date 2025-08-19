import {
  FC,
  HTMLAttributes,
  ElementType,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { Button } from "../main";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

const TableStyle = cva("font-bold", {
  variants: {
    colVariant: {
      default: "text-black-500",
      primary: "text-blue-500",
      success: "text-green-500",
      warning: "text-orange-500",
      danger: "text-red-500",
    },
    font: {
      bold: "font-bold",
      semi: "font-semibold",
      normal: "font-normal",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-xl",
      lg: "text-2xl",
    },
    background: {
      default: "bg-transparent",
      primary: "bg-blue-100",
      success: "bg-green-100",
      warning: "bg-orange-100",
      danger: "bg-red-100",
    },
    padding: {
      default: "p-0",
      sm: "p-1",
      md: "p-3",
    },
    rounded: {
      basic: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-2xl",
    },
  },
  defaultVariants: {
    colVariant: "default",
    size: "md",
    font: "normal",
    background: "default",
    padding: "md",
    rounded: "sm",
  },
});

interface Action {
  label: string;
  onClick: (rowIndex: number) => void;
  icon?: ReactNode;
}

interface TableProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof TableStyle> {
  as?: ElementType;
  headers?: string[];
  rows?: ReactNode[][];
  actions?: Action[];
  cellClasses?: string[][];
  columnWidths?: string[];
}

const Table: FC<TableProps> = forwardRef<HTMLElement, TableProps>(
  (
    {
      as: Tag = "table",
      colVariant,
      size,
      font,
      background,
      padding,
      rounded,
      headers = [],
      rows = [],
      actions = [],
      cellClasses = [],
      columnWidths = [],
      className,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const classes = classNames(
      TableStyle({
        colVariant,
        size,
        font,
        background,
        padding,
        rounded,
      }),
      className
    );

    return (
      <>
        <div className="w-full overflow-x-auto p-4">
          <Tag ref={ref} className={classes} {...props}>
            <thead className="border-2 border-gray-400 rounded-md">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-center"
                    style={
                      columnWidths[index] ? { width: columnWidths[index] } : {}
                    }
                  >
                    {header}
                  </th>
                ))}
                {actions.length > 0 && <th className="text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="border border-gray-400 rounded-md">
              {currentRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border border-gray-400 rounded-md"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={classNames(
                        "px-4 py-2 text-center",
                        cellClasses[rowIndex]?.[cellIndex]
                      )}
                      style={
                        columnWidths[cellIndex]
                          ? { width: columnWidths[cellIndex] }
                          : {}
                      }
                    >
                      {cell}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="flex justify-center items-center space-x-2 px-4 py-2 text-center">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className="text-white bg-blue-500 px-2 py-1 rounded-md hover:bg-blue-600"
                          onClick={() => action.onClick(rowIndex)}
                        >
                          {action.icon && (
                            <span className="mr-1">{action.icon}</span>
                          )}
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Tag>
        </div>

        {/* Paginación */}
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            size="sm"
            rounded="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <GrCaretPrevious size={20} />
          </Button>
          <span className="px-4 py-2 text-lg">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            rounded="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <GrCaretNext size={20} />
          </Button>
        </div>
      </>
    );
  }
);

Table.displayName = "Table";

export { Table };
