import React, { useState } from "react";
import styled from "styled-components";
import { InputField } from "../atoms/InputField";
import { Button } from "../atoms/Button";

type ColumnType = "text" | "number" | "numberSelect" | "stringSelect" | "password";

type Column = {
  key: string;
  name: string;
  type: ColumnType;
  options?: string[];
  readOnly?: boolean;
};

type TableRow = { [key: string]: string | number };
type ReadOnlyCells = { [rowIndex: number]: { [colKey: string]: boolean } };


const TableContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow || "0 2px 8px rgba(0,0,0,0.12)"};
  border: 4px solid
    ${({ theme }) =>
      theme.colors.surface === "#F6F2FF" ? theme.colors.text : theme.colors.primary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textDisabled};
  padding: ${({ theme }) => theme.spacing.small};
   text-align: center;          
  vertical-align: middle;  
  font-size: ${({ theme }) => theme.typography.textSmall.fontSize};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDisabled};
    text-align: center;       
  vertical-align: middle;
`;

export const ProductTable = () => {
  const [columns, setColumns] = useState<Column[]>([
    { key: "id", name: "ID", type: "number", readOnly: true },
  ]);
  const [rows, setRows] = useState<TableRow[]>([]);
  const [readOnlyCells, setReadOnlyCells] = useState<ReadOnlyCells>({});

  const [colName, setColName] = useState("");
  const [colType, setColType] = useState<ColumnType>("text");
  const [colOptions, setColOptions] = useState("");

  const addColumn = () => {
    if (!colName) return;
    const newCol: Column = {
      key: `col${columns.length}`,
      name: colName,
      type: colType,
      options:
        colType === "stringSelect" || colType === "numberSelect"
          ? colOptions.split(",").map((s) => s.trim())
          : undefined,
    };
    setColumns([...columns, newCol]);
    setColName("");
    setColOptions("");
  };

  const addRow = () => {
    const newRow: TableRow = {};
    columns.forEach((col) => {
      if (col.key === "id") {
        newRow[col.key] = rows.length + 1;
      } else {
        newRow[col.key] =
          col.type === "numberSelect"
            ? col.options && col.options.length > 0
              ? col.options[0]
              : 0
            : col.type === "number"
            ? 0
            : "";
      }
    });
    setRows([...rows, newRow]);
  };

  const updateRow = (rowIndex: number, key: string, value: string | number) => {
    const newRows = [...rows];
    newRows[rowIndex][key] = value;
    setRows(newRows);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colKey: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setReadOnlyCells((prev) => ({
        ...prev,
        [rowIndex]: {
          ...prev[rowIndex],
          [colKey]: true,
        },
      }));
    }
  };

  const isCellReadOnly = (rowIndex: number, colKey: string): boolean => {
    return !!readOnlyCells[rowIndex]?.[colKey];
  };

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <InputField
          placeholder="Column Name"
          value={colName}
          onChange={(val) => setColName(val as string)}
        />
        <InputField
          type="stringSelect"
          placeholder="Select type"
          options={["text", "number", "stringSelect", "numberSelect", "password"]}
          value={colType}
          onChange={(val) => setColType(val as ColumnType)}
        />
        {(colType === "stringSelect" || colType === "numberSelect") && (
          <InputField
            placeholder="Options comma separated"
            value={colOptions}
            onChange={(val) => setColOptions(val as string)}
          />
        )}
        <Button style={{ minWidth: "140px" }} onClick={addColumn}>Add Column</Button>
      </div>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.name}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <Td key={col.key}>
                    {col.readOnly || isCellReadOnly(rowIndex, col.key) ? (
                      <span>{row[col.key]}</span>
                    ) : (
                      <InputField
                        type={col.type}
                        options={col.options}
                        value={row[col.key]}
                        onChange={(val) => updateRow(rowIndex, col.key, val)}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, col.key)}
                      />
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Button style={{ minWidth: "120px" }} onClick={addRow}>Add Row</Button>
      </TableContainer>
    </div>
  );
};
