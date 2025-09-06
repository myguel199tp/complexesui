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
  label?: string;
  tKey?: string; // 👈 Para traducción
  onClick: (rowIndex: number) => void;
  icon?: ReactNode;
}

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
  borderColor?: string; // 👈 nuevo prop
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
      borderColor = "border-gray-300", // 👈 por defecto
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();

    // 👇 Cambia idioma cuando se pasa por props
    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language);
      }
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

    const classes = classNames(
      TableStyle({ colVariant, size, font, background, padding, rounded }),
      className
    );

    return (
      <>
        {/* Contenedor con borde redondeado */}
        <div className="w-full overflow-x-auto p-4">
          <Tag
            ref={ref}
            className={classNames(
              classes,
              "rounded-lg overflow-hidden",
              borderColor
            )}
            {...props}
          >
            <thead className="bg-gray-100">
              <tr>
                {(headerKeys.length > 0 ? headerKeys : headers).map(
                  (header, index) => (
                    <th
                      key={index}
                      className={classNames(
                        "px-4 py-2 text-center border",
                        borderColor,
                        index === 0 && "rounded-tl-lg",
                        index === headers.length - 1 &&
                          actions.length === 0 &&
                          "rounded-tr-lg"
                      )}
                      style={
                        columnWidths[index]
                          ? { width: columnWidths[index] }
                          : {}
                      }
                    >
                      {headerKeys.length > 0 ? t(header as string) : header}
                    </th>
                  )
                )}

                {actions.length > 0 && (
                  <th
                    className={classNames(
                      "px-4 py-2 text-center border rounded-tr-lg bg-gray-100",
                      borderColor
                    )}
                  >
                    {t("table.actions")}
                  </th>
                )}
              </tr>
            </thead>

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
