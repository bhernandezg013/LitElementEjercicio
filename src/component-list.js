import { LitElement, html, css } from "lit";


class ComponentList extends LitElement {

    static styles = css`
        .table-wrapper {
            width: 100%;
            overflow-x: auto;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }

        .table th {
            background-color: #333;
            color: white;
            padding: 10px;
            text-align: left;
        }

        .table td, .table th {
            padding: 8px;
        }
        
        .td-alive-true {
            border: 1px solid #7CFC00;
            padding: 10px;
        }
        .td-alive-false {
            border: 1px solid #FF0000;
            padding: 10px;
        }

        .table tr:hover {
            background-color: rgb(102,102,102);
        }
    `

    static properties = {
        arrayPersonajes: { type: Array },
    }

    constructor() {
        super();
        this.arrayPersonajes = [];
    }


    render() {
        return html`
        
        <div class="table-wrapper">
            <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Genero</th>
                    <th>House</th>
                    <th>Fecha Nacimiento</th>
                    <th>Año Nacimiento</th>
                    <th>Wizard</th>
                    <th>Ancestry</th>
                    <th>Color Ojos</th>
                    <th>Color Cabello</th>
                    <th>Patronus</th>
                    <th>Estudiante</th>
                    <th>Con vida</th>
                    <th>Actor</th>
                  </tr>
                </thead>
                <tbody>
                    ${this.arrayPersonajes.map((personaje, index) => html`
                        <tr class=${personaje.alive ? 'td-alive-true' : 'td-alive-false'} >
                            <td>${index + 1}</td>
                            <td><img src=${personaje.image ? personaje.image : 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'} style="width: 50px;"></td>
                            <td>${personaje.name}</td>
                            <td>${personaje.species}</td>
                            <td>${personaje.gender}</td>
                            <td>${personaje.house}</td>
                            <td>${personaje.dateOfBirth}</td>
                            <td>${personaje.yearOfBirth}</td>
                            <td>${personaje.wizard}</td>
                            <td>${personaje.ancestry}</td>
                            <td>${personaje.eyeColour}</td>
                            <td>${personaje.hairColour}</td>
                            <td>${personaje.patronus}</td>
                            <td>${personaje.hogwartsStudent}</td>
                            <td>${personaje.alive}</td>
                            <td>${personaje.actor}</td>
                        </tr>
                    `)}

                </tbody>
            </table>
        </div>
        `;
    }

}
customElements.define('component-list', ComponentList);
