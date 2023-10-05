/* eslint-disable react/prop-types */
export const PointSquare = ({children, isSelected}) => {
  const className = `puntuation ${isSelected ? 'is-selected' : ''}`

  return (
    <span className={className}>{children}</span>
  )
}