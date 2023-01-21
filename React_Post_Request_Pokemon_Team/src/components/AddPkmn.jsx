import { useRef } from "react";
import "./style/AddPkmn.css";

const AddPkmn = (onAddPkmn) => {
  const nameRef = useRef("");
  const pokedexIndexRef = useRef("");
  const typeRef = useRef("");
  const generationRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault(); //--->to avoid the "form" issue

    console.log("Data Sent");

    const newPkmn = {
      name: nameRef.current.value,
      pokedexIndex: pokedexIndexRef.current.value,
      type: typeRef.current.value,
      generation: generationRef.current.value,
    };

    onAddPkmn(newPkmn);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" placeholder="Name" ref={nameRef} />
      <label htmlFor="pokedexIndex">Number</label>
      <input
        type="text"
        id="pokedexIndex"
        placeholder="Pokedex Number"
        ref={pokedexIndexRef}
      />
      <label htmlFor="type">Type</label>
      <input type="text" id="type" placeholder="Type" ref={typeRef} />
      <label htmlFor="generation">Generation</label>
      <input
        type="text"
        id="generation"
        placeholder="Generation"
        ref={generationRef}
      />
      <button>Create Pkmn</button>
    </form>
  );
};

export { AddPkmn };
