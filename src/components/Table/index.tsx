import { JSX } from "react";

interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => JSX.Element;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-lg border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="border p-2">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border hover:bg-gray-100">
                {columns.map((col) => (
                  <td key={String(col.key)} className="border p-2">
                    <div className="flex items-center justify-center text-center">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-2 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
