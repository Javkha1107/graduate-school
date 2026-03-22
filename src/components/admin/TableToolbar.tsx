"use client";

import { useState, useRef, useEffect } from "react";
import { Grid3X3, Plus, Minus, Trash2 } from "lucide-react";

interface TableToolbarProps {
  contentHtml: string;
  onChange: (html: string) => void;
}

export default function TableToolbar({
  contentHtml,
  onChange,
}: TableToolbarProps) {
  const [showInsert, setShowInsert] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setShowInsert(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function insertTable() {
    const headerCells = Array.from(
      { length: cols },
      (_, i) => `<td>Толгой ${i + 1}</td>`,
    ).join("");
    const bodyCells = Array.from(
      { length: cols },
      () => "<td>&nbsp;</td>",
    ).join("");
    const bodyRows = Array.from(
      { length: rows - 1 },
      () => `<tr>${bodyCells}</tr>`,
    ).join("");
    const table = `<table><tbody><tr>${headerCells}</tr>${bodyRows}</tbody></table><p><br></p>`;
    onChange(contentHtml + table);
    setShowInsert(false);
  }

  function addRow() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const tables = doc.querySelectorAll("table");
    const last = tables[tables.length - 1];
    if (!last) return;
    const tbody = last.querySelector("tbody") || last;
    const colCount = last.querySelector("tr")?.children.length || 2;
    const tr = doc.createElement("tr");
    for (let i = 0; i < colCount; i++) {
      const td = doc.createElement("td");
      td.innerHTML = "&nbsp;";
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    onChange(doc.body.innerHTML);
  }

  function removeRow() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const tables = doc.querySelectorAll("table");
    const last = tables[tables.length - 1];
    if (!last) return;
    const allRows = last.querySelectorAll("tr");
    if (allRows.length > 2) {
      allRows[allRows.length - 1].remove();
    }
    onChange(doc.body.innerHTML);
  }

  function addCol() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const tables = doc.querySelectorAll("table");
    const last = tables[tables.length - 1];
    if (!last) return;
    last.querySelectorAll("tr").forEach((tr) => {
      const td = doc.createElement("td");
      td.innerHTML = "&nbsp;";
      tr.appendChild(td);
    });
    onChange(doc.body.innerHTML);
  }

  function removeCol() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const tables = doc.querySelectorAll("table");
    const last = tables[tables.length - 1];
    if (!last) return;
    const firstRow = last.querySelector("tr");
    if (!firstRow || firstRow.children.length <= 1) return;
    last.querySelectorAll("tr").forEach((tr) => {
      const lastCell = tr.lastElementChild;
      if (lastCell) lastCell.remove();
    });
    onChange(doc.body.innerHTML);
  }

  function removeAllTables() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    doc.querySelectorAll("table").forEach((t) => t.remove());
    onChange(doc.body.innerHTML);
  }

  const hasTable = /<table[\s>]/i.test(contentHtml);
  const BTN =
    "flex items-center gap-1 px-2 py-1.5 text-xs rounded-lg transition-colors hover:bg-primary/10 hover:text-primary text-muted-foreground";

  return (
    <div
      ref={popRef}
      className="relative flex flex-wrap items-center gap-1 mb-2"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowInsert(!showInsert)}
          className={BTN}
          title="Хүснэгт нэмэх"
        >
          <Grid3X3 className="h-3.5 w-3.5" />
          <span>Хүснэгт</span>
        </button>
        {showInsert && (
          <div className="absolute top-full left-0 mt-1 z-30 bg-white border border-border rounded-xl shadow-lg p-3 space-y-3 min-w-[200px]">
            <p className="text-xs font-medium text-foreground">
              Хүснэгт оруулах
            </p>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-12">Мөр:</label>
              <input
                type="number"
                min={2}
                max={20}
                value={rows}
                onChange={(e) => setRows(Math.max(2, +e.target.value))}
                className="w-16 border border-border rounded-lg px-2 py-1 text-xs text-center"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-12">
                Багана:
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={cols}
                onChange={(e) => setCols(Math.max(1, +e.target.value))}
                className="w-16 border border-border rounded-lg px-2 py-1 text-xs text-center"
              />
            </div>
            <button
              type="button"
              onClick={insertTable}
              className="w-full text-xs font-medium bg-primary text-white rounded-lg py-1.5 hover:bg-primary-dark transition-colors"
            >
              Оруулах
            </button>
          </div>
        )}
      </div>

      {hasTable && (
        <>
          <span className="w-px h-5 bg-border mx-1" />
          <button
            type="button"
            onClick={addRow}
            className={BTN}
            title="Мөр нэмэх"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Мөр</span>
          </button>
          <button
            type="button"
            onClick={removeRow}
            className={BTN}
            title="Мөр хасах"
          >
            <Minus className="h-3.5 w-3.5" />
            <span>Мөр</span>
          </button>
          <span className="w-px h-5 bg-border mx-1" />
          <button
            type="button"
            onClick={addCol}
            className={BTN}
            title="Багана нэмэх"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Багана</span>
          </button>
          <button
            type="button"
            onClick={removeCol}
            className={BTN}
            title="Багана хасах"
          >
            <Minus className="h-3.5 w-3.5" />
            <span>Багана</span>
          </button>
          <span className="w-px h-5 bg-border mx-1" />
          <button
            type="button"
            onClick={removeAllTables}
            className={`${BTN} hover:bg-red-50 hover:text-red-600`}
            title="Бүх хүснэгт устгах"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Устгах</span>
          </button>
        </>
      )}
    </div>
  );
}
