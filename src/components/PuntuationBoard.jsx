/* eslint-disable react/prop-types */
import { TURNS } from "../constants"
import { PointSquare } from "./PointSquare"

export const PuntuationBoard = ({points, turn}) => {

  return (
    <section className="container-points">
      <PointSquare isSelected={turn === TURNS.X}>{TURNS.X} - {points.x}</PointSquare>
      <PointSquare isSelected={turn === TURNS.O}>{TURNS.O} - {points.o}</PointSquare>
      <span className="puntuation"></span>
    </section>
  )
}