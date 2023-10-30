import React, { useEffect, useState } from "react";
import Input from "./Input";

function TitleForm({onSearchTitle, searchResult}) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onSearchTitle(title);
  };
  var response = ""
  if(searchResult.alimento != null){
    response = `O alimento ${searchResult.alimento.title} está presente no estoque do supermercado com o id ${searchResult.alimento._id}.`;
  }else if(searchResult.bebida){
    response = `A bebida ${searchResult.bebida.title} está presente no estoque do supermercado com o id ${searchResult.bebida._id}.`;
  }else{
    response = `O item ${title} consultado não está presente no estoque do supermercado!`;
  }

  useEffect(()=>onSearchTitle(title), [title]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
        aria-label="Pesquisa no Banco"
        onChange={handleChange}
        placeholder="Consulte um item"
        type="text"
        />
      </form>
      <h3>
        {response}
      </h3>
    </div>
  )
}

export default TitleForm;