import { LitElement, html } from "lit";


class ComponentList extends LitElement {

    static properties = {
        arrayPersonajes: { type: Array },
    }

    constructor() {
        super();
        this.arrayPersonajes = [];
    }


    render() {
        return html`
        
            <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>House</th>
                    <th>Patronus</th>
                  </tr>
                </thead>
                <tbody>
                    ${this.arrayPersonajes.map((personaje, index) => html`
                        <tr>
                            <td>${index + 1}</td>
                            <td><img src=${personaje.image ? personaje.image : 'https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?pid=ImgDet&rs=1'} style="width: 50px;"></td>
                            <td>${personaje.name}</td>
                            <td>${personaje.species}</td>
                            <td>${personaje.house}</td>
                            <td>${personaje.patronus}</td>
                        </tr>
                    `)}

                </tbody>
            </table>
        
        `;
    }

}
customElements.define('component-list', ComponentList);
