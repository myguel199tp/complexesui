"use client";

import {
  FC,
  HTMLAttributes,
  ElementType,
  forwardRef,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { Button } from "../main";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

/* 🎨 Estilos base de la tabla */
const TableStyle = cva("font-bold border-collapse w-full", {
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
      xxs: "text-[10px]",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
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
    sizeText: {
      xxs: "text-[10px]",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
    },
    fontText: {
      light: "font-light",
      normal: "font-normal",
      semi: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    colVariant: "default",
    font: "normal",
    size: "md",
    background: "default",
    padding: "md",
    rounded: "sm",
    sizeText: "sm",
    fontText: "normal",
  },
});

interface Action {
  label?: string;
  tKey?: string;
  onClick: (rowIndex: number) => void;
  icon?: ReactNode;
}

/**
 * ✅ Tipado correcto:
 * - Se heredan todas las variantes del cva.
 * - Se eliminan los literales fijos que limitaban las props.
 */
interface TableProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof TableStyle> {
  as?: ElementType;
  headers?: string[];
  headerKeys?: string[];
  rows?: ReactNode[][];
  actions?: Action[];
  cellClasses?: string[][];
  columnWidths?: string[];
  language?: "es" | "en" | "pt";
  borderColor?: string;
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
      headerKeys = [],
      rows = [],
      actions = [],
      cellClasses = [],
      columnWidths = [],
      className,
      language,
      borderColor = "border-gray-300",
      sizeText,
      fontText,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
      if (language) i18n.changeLanguage(language);
    }, [language]);

    const rowsPerPage = 15;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const handlePrevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // ✅ Unificamos los estilos, incluyendo sizeText y fontText
    const tableClasses = classNames(
      TableStyle({
        colVariant,
        size,
        font,
        background,
        padding,
        rounded,
        sizeText,
        fontText,
      }),
      className
    );

    return (
      <>
        <div className="w-full overflow-x-auto p-4">
          <Tag
            ref={ref}
            className={classNames(
              tableClasses,
              "rounded-lg overflow-hidden border",
              borderColor
            )}
            {...props}
          >
            {/* HEADER */}
            <thead className="bg-gray-100">
              <tr>
                {(headerKeys.length > 0 ? headerKeys : headers).map(
                  (header, index) => (
                    <th
                      key={index}
                      className={classNames(
                        "px-4 py-2 text-center border text-gray-800",
                        tableClasses,
                        borderColor
                      )}
                    >
                      {headerKeys.length > 0 ? t(header as string) : header}
                    </th>
                  )
                )}

                {actions.length > 0 && (
                  <th
                    className={classNames(
                      "px-4 py-2 text-center border bg-gray-100 text-gray-800 rounded-tr-lg",
                      tableClasses,
                      borderColor
                    )}
                  >
                    {t("table.actions")}
                  </th>
                )}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {currentRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={classNames("border", borderColor)}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={classNames(
                        "px-4 py-2 text-center border",
                        tableClasses,
                        borderColor,
                        cellClasses[rowIndex]?.[cellIndex],
                        rowIndex === currentRows.length - 1 &&
                          cellIndex === 0 &&
                          "rounded-bl-lg",
                        rowIndex === currentRows.length - 1 &&
                          cellIndex === row.length - 1 &&
                          actions.length === 0 &&
                          "rounded-br-lg"
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
                    <td
                      className={classNames(
                        "flex justify-center items-center space-x-2 px-4 py-2 text-center border",
                        borderColor,
                        rowIndex === currentRows.length - 1 && "rounded-br-lg"
                      )}
                    >
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(rowIndex)}
                        >
                          {action.icon && (
                            <span className="mr-1">{action.icon}</span>
                          )}
                          {action.tKey ? t(action.tKey) : action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Tag>
        </div>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
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
        )}
      </>
    );
  }
);

Table.displayName = "Table";

export { Table };
