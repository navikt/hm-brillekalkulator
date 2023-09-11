
interface FormatertStyrkeProps {
  verdi?: number | string
  type: 'sfære' | 'sylinder'
}

export function FormatertStyrke(props: FormatertStyrkeProps) {
  const { verdi, type } = props
  if (verdi == null || verdi === '') {
    return null
  }
  switch (type) {
    case 'sfære':
      if(verdi < 0 ){
        return <>-{formater(-Number(verdi))}</>
      } else if(verdi > 0){
        return <>+{formater(+Number(verdi))}</>
      } else {
        return  <>{formater(+Number(verdi))}</>
      }

    case 'sylinder':
      return <>{formater(-Number(verdi))}</>
    default:
      return null
  }
}

function formater(verdi: number) {
  return formatter.format(verdi)
}

const formatter = new Intl.NumberFormat('nb', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
