export default function Pagination({ page, pages, onPage }) {
    if (pages <= 1) return null
    const arr = Array.from({length: pages}, (_, i) => i + 1)
    return (
      <div className="pagination">
        <button disabled={page===1} onClick={()=> onPage(page-1)}>←</button>
        {arr.map(p => (
          <button key={p} className={p===page? 'active':''} onClick={()=> onPage(p)}>{p}</button>
        ))}
        <button disabled={page===pages} onClick={()=> onPage(page+1)}>→</button>
      </div>
    )
  }