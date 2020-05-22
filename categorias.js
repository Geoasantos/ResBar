new Vue({
    el: "#appRESBAR",
    data: {
        categorias: [],
        categoria: {
            id: "0",
            nombre: ""
        },

        cat: {
            nombre: ""
        },
        displayOption: "",
        agg: true,
        searchDisplay: "",
        urlApi: `${ApiRestUrl}/categorias`
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */

        

        edithRegistro() {
        
            axios.patch(`${this.urlApi}/${this.categoria.id}`,{
                nombre: this.categoria.nombre
            }).then(
                response => {
                    console.log(this.cat);
                    this.getAll();
                    console.log(response.status);
                }
            ).catch(ex => { console.log(ex) })

        },

        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            if (this.categoria.nombre.trim() !== "") {
                this.agg = true;
                axios.post(`${this.urlApi}`, {
                    nombre: `${this.categoria.nombre}`
                }).then(response => {
                    console.log(response.status);
                    this.categorias = response.data;
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                this.agg = false;
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            this.displayOption = 'eliminar';
            axios.delete(`${this.urlApi}/${this.categoria.id}`).then(
                response => {
                    this.getAll();
                    console.log(response.status)
                }
            ).catch(ex => { console.log(ex) });

        },

        /*
        recolecta todos los datos al hacer una peticion al api
         */
        getAll() {
            axios.get(this.urlApi).then(
                response => {
                    this.categorias = response.data
                }
            ).catch(ex => { console.log(ex) })
        },

        /*
        limpiando valores de la categoria previamente seleccionada
         */
        clearData() {
            this.categoria = {
                id: "0",
                nombre: ""
            }
            this.getAll();
        },
        addMode() {
            this.clearData();
            this.displayOption = "Agregue una nueva Categoria";
        },
        getCategoriaSelected(cat) {
            this.displayOption = "Modifique la Categoria";
            this.categoria = cat;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.categorias[valor].id + this.categorias[valor].nombre).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        }
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        this.getAll();
    },
    created(){
        if(localStorage.vue_session_key){
        
        }else{
            window.location = "http://localhost:5500/login.html"
        } 
    }
});
