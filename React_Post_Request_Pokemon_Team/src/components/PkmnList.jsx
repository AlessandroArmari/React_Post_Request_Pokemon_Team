import { Pkmn } from "./Pkmn";
const PkmnList = (props) => {
  return (
    <>
      <ul className="ul">
        {props.listOfPkmn.map((pkmn, i) => {
          return (
            <Pkmn
              key={i}
              name={pkmn.name}
              pokedexIndex={pkmn.pokedexIndex}
              type={pkmn.type}
              generation={pkmn.generation}
              sprite={pkmn.sprite}
            />
          );
        })}
      </ul>
    </>
  );
};

export { PkmnList };
