// ...existing code...
import React from "react";
import styled, { css } from "styled-components";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtons?: number; // kolik čísel zobrazit v okolí (default 5)
  className?: string;
};

export type PaginationDotsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxDots?: number; // pokud je více stránek, ořízne počet zobrazených teček
  className?: string;
};

const Wrap = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
`;

const ButtonBase = styled.button<{ $small?: boolean }>`
  appearance: none;
  border: none;
  background: transparent;
  padding: ${({ $small }) => ($small ? "6px" : "8px 12px")};
  border-radius: 999px;
  cursor: pointer;
  color: inherit;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const PageButton = styled(ButtonBase)<{ $active?: boolean }>`
  ${({ $active }) =>
    $active
      ? css`
          border: 3px solid ${({ theme }) => theme.colors.primary};
          background: ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.primary};
        `
      : css`
          background: transparent;
          color: ${({ theme }) => theme.colors.text};
          &:hover {
            border: 3px solid ${({ theme }) => theme.colors.primary};
          }
        `}
  min-width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Ellipsis = styled.span`
  padding: 0 6px;
  opacity: 0.7;
`;

const Dot = styled(ButtonBase)<{ $active?: boolean }>`
  width: ${({ $active }) => ($active ? "10px" : "7px")};
  height: ${({ $active }) => ($active ? "10px" : "7px")};
  padding: 0;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.light};
`;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function getRange(current: number, total: number, maxButtons: number) {
  if (total <= maxButtons) {
    return { start: 1, end: total };
  }
  const half = Math.floor(maxButtons / 2);
  let start = current - half;
  let end = current + half;
  if (start < 1) {
    start = 1;
    end = maxButtons;
  } else if (end > total) {
    end = total;
    start = total - maxButtons + 1;
  }
  return { start, end };
}

/* Numbered pagination with arrows + ellipses */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxButtons = 5,
  className,
}) => {
  const prev = () => onPageChange(clamp(currentPage - 1, 1, totalPages));
  const next = () => onPageChange(clamp(currentPage + 1, 1, totalPages));

  const { start, end } = getRange(currentPage, totalPages, maxButtons);

  return (
    <Wrap aria-label="Pagination" className={className}>
      <ButtonBase onClick={prev} disabled={currentPage === 1} aria-label="Previous page">
        ‹
      </ButtonBase>

      {start > 1 && (
        <>
          <PageButton onClick={() => onPageChange(1)} $active={false} aria-label={`Page 1`}>
            1
          </PageButton>
          {start > 2 && <Ellipsis aria-hidden>…</Ellipsis>}
        </>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        return (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            $active={page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </PageButton>
        );
      })}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <Ellipsis aria-hidden>…</Ellipsis>}
          <PageButton onClick={() => onPageChange(totalPages)} $active={false} aria-label={`Page ${totalPages}`}>
            {totalPages}
          </PageButton>
        </>
      )}

      <ButtonBase onClick={next} disabled={currentPage === totalPages} aria-label="Next page">
        ›
      </ButtonBase>
    </Wrap>
  );
};

/* Dots-only pagination (menší komponenta) */
export const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxDots = 10,
  className,
}) => {
  // pokud je více než maxDots, zobraz okno kolem currentPage
  const { start, end } = getRange(currentPage, totalPages, Math.min(maxDots, totalPages));

  return (
    <Wrap aria-label="Pagination dots" className={className}>
      {start > 1 && (
        <Dot $small onClick={() => onPageChange(1)} aria-label="Go to first page" />
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        return (
          <Dot
            key={page}
            onClick={() => onPageChange(page)}
            $active={page === currentPage}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "true" : undefined}
          />
        );
      })}

      {end < totalPages && (
        <Dot $small onClick={() => onPageChange(totalPages)} aria-label="Go to last page" />
      )}
    </Wrap>
  );
};