export default function Header () {
  const ulStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    padding: '18px'
  }

  const headerContainerStyle = {
    background: '#DADCE008',
    borderRadius: '10px',
    color: '#DADCE0'
  }

  return (
        <div style={headerContainerStyle}>
            <ul style={ulStyle}>
                <li>
                <button>Questions</button>
                </li>
                <li>WORDLE</li>
                <li>
                    <button>Stadisticas</button>
                    <button>toggle</button>
                </li>
            </ul>
        </div>
  )
}
