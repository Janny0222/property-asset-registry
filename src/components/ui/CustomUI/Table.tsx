import { TableColumn } from '@/types/propTypes';
import React from 'react';

interface TableProps<T> {
  bgColor?: string;
  title?: string;
  tableHead: TableColumn[];
  rowData: T[];
  rowRender?: (data: T, i: number) => React.ReactNode;
}
const Head = 'text-xs text-center text-white text-main font-bold px-6 py-2 uppercase';


const Rows = <T extends object>({data, i, rowRenderer}: { data: T; i: number; rowRenderer?: (data: T, i: number) => React.ReactNode }) => {
  return <tr className='' key={i}>{rowRenderer ? rowRenderer(data, i) : <></>}</tr>
};
const Table =<T extends object> ({ tableHead, rowData, rowRender, bgColor, title }: TableProps<T>) => {
  return (
    <div className="overflow-x-scroll relative w-full border-2" >
      <h1 className='text-center font-bold text-3xl'>{title ? title : ''}</h1>
      <table className="w-full  table-auto border rounded-lg border-lightColor divide-x-2 divide-y">
        <thead className='rounded-md'>
          <tr className="bg-fontColor border ">
            {tableHead.map((head, index) => (
              <th key={index} scope="col" className={`${Head}`}>
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`${bgColor} divide-y `}>
          {rowData.map((data, i) => (
            <Rows key={i} data={data} i={i} rowRenderer={rowRender} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
