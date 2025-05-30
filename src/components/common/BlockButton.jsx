function BlockButton({label, onClick, styleName}) {
  const className = `btn btn-outline-${styleName} btn-block`;
  return (
    <div className='d-grid gap-3'>
      <button type='button' className={className} onClick={onClick}>{label}</button>
    </div>
  )
}

export default BlockButton