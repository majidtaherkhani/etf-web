import React from 'react';

export interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export function Table<T extends { id?: string | number } | any>({ 
  data, 
  columns, 
  emptyMessage = "No results found" 
}: TableProps<T>) {
  return (
    <div className="overflow-auto flex-1">
      <table className="w-full text-sm text-center">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={`px-6 py-3 text-center ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={item.id || rowIndex} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-3 text-center">
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

