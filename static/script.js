let baseUrl = "http://localhost:5000";

$.get( `${baseUrl}/skills/`, function( data ) {
    let skills = data.data;
    localStorage.setItem('skills',JSON.stringify(skills));
});

$("#nuevo-jugador").on("click",function(){
    var nombre = $("#nombre").val();
    var ataque = parseInt($("#ataque").val());
    var defensa = parseInt($("#defensa").val());
    var stamina = parseInt($("#stamina").val());
    var tecnica = parseInt($("#tecnica").val());
    var promedio = ((ataque + defensa + stamina + tecnica) / 4).toFixed(1);
    $("#players-container").append(`
    <div class="card player-card">
       <div class="card-header bg-success player-name-card">
        ${nombre}
       </div>
       <div class="card-body average-skill-title">
       <h3>Promedio</h3>
       </div>
       <div class="card-body average-skill-info">
        <div class="card-body bg-success average-skill-card">
          <h1 class="average-skill-player">${promedio}</h1>
        </div>
       </div>
       <div class="card-body">
        <label>Ataque: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${ataque / 4 * 100}%" aria-valuenow="${ataque}" aria-valuemin="0" aria-valuemax="4">${ataque}</div></div>
        <label>Defensa: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${defensa / 4 * 100}%" aria-valuenow="${defensa}" aria-valuemin="0" aria-valuemax="4">${defensa}</div></div>
        <label>Stamina: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${stamina / 4 * 100}%" aria-valuenow="${stamina}" aria-valuemin="0" aria-valuemax="4">${stamina}</div></div>
        <label>Tecnica: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${tecnica / 4 * 100}%" aria-valuenow="${tecnica}" aria-valuemin="0" aria-valuemax="4">${tecnica}</div></div>
      </div>
    </div>
    `);
    // Save to DB
    $.ajax({
        type: "POST",
        url: `${baseUrl}/players/`,
        data: JSON.stringify({"name":nombre, "skills":[{"id":1,"strength":ataque},{"id":2,"strength":defensa},{"id":3,"strength":stamina},{"id":4,"strength":tecnica}]}),
        success: alert("Jugador creado con exito!"),
        contentType: "application/json; charset=utf-8"
      });
});

$.get( `${baseUrl}/players/`, function( data ) {
    let players_data = data.data;
    let nombre, ataque, defensa, stamina, tecnica;
    for(let i=0; i < players_data.length; i++){
        nombre = players_data[i]['name'];
        for(let j=0; j < players_data[i]['skills'].length; j ++){
            let skill = players_data[i]['skills'][j];
            switch(skill['name']) {
                case "ataque":
                  ataque = skill['strength'];
                  break;
                case "defensa":
                  defensa = skill['strength'];
                  break;
                case "stamina":
                  stamina = skill['strength'];
                case "tecnica":
                  tecnica = skill['strength'];
              }

        }     
        let promedio = ((ataque + defensa + stamina + tecnica) / 4).toFixed(1);
        $("#players-container").append(`
        <div class="card player-card">
           <div class="card-header bg-success player-name-card">
            ${nombre}
           </div>
           <div class="card-body average-skill-title">
           <h3>Promedio</h3>
           </div>
           <div class="card-body average-skill-info">
            <div class="card-body bg-success average-skill-card">
              <h1 class="average-skill-player">${promedio}</h1>
            </div>
           </div>
           <div class="card-body">
            <label>Ataque: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${ataque / 4 * 100}%" aria-valuenow="${ataque}" aria-valuemin="0" aria-valuemax="4">${ataque}</div></div>
            <label>Defensa: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${defensa / 4 * 100}%" aria-valuenow="${defensa}" aria-valuemin="0" aria-valuemax="4">${defensa}</div></div>
            <label>Stamina: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${stamina / 4 * 100}%" aria-valuenow="${stamina}" aria-valuemin="0" aria-valuemax="4">${stamina}</div></div>
            <label>Tecnica: </label><div class="progress"><div class="progress-bar bg-success" role="progressbar" style="width: ${tecnica / 4 * 100}%" aria-valuenow="${tecnica}" aria-valuemin="0" aria-valuemax="4">${tecnica}</div></div>
          </div>
        </div>
        `);
    }
  });

  $(".button-add-new-player").on("click",function(){


  });
