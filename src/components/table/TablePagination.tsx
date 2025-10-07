'use client';

import React from 'react';
import { Button } from '../ui/button';
import { PaginationState, PaginationTableState } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type TablePaginationProps = {
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  pageIndex: number;
  pageCount: number;
};

const TablePagination = ({
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageCount,
}: TablePaginationProps) => {
  return (
    <>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={firstPage}
        disabled={!canPreviousPage}>
        <ChevronsLeft />
      </Button>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={previousPage}
        disabled={!canPreviousPage}>
        <ChevronLeft />
      </Button>
      <span className='text-sm px-1 min-w-[5rem] text-center'>
        {pageIndex + 1} van {pageCount}
      </span>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={nextPage}
        disabled={!canNextPage}>
        <ChevronRight />
      </Button>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={lastPage}
        disabled={!canNextPage}>
        <ChevronsRight />
      </Button>
    </>
  );
};

export default TablePagination;
