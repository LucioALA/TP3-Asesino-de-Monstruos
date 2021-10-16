new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true
            this.saludJugador= 100
            this.saludMonstruo= 100
            this.turnos=[]
            
        },
        atacar: function () {
            
            var daño=this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo-=daño

            
            if(!this.verificarGanador()){
                
                this.ataqueDelMonstruo()
                this.turnos.unshift({esJugador:true, text:"Lastimaste al monstruo en " + daño + " puntos"})
            }
            
            

            
        },

        ataqueEspecial: function () {
            var daño=this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo-=daño
           
            if(!this.verificarGanador()){

                this.ataqueDelMonstruo()
                this.turnos.unshift({esJugador:true, text:"El monstruo te lastimó con " + daño + " puntos"})
            }

            
            
        },

        curar: function () {
            var mensaje
       if(this.saludJugador>=90){
           this.saludJugador=100
           mensaje="te curaste completamente"
       }else{
           this.saludJugador+=10
           mensaje="te curaste en 10 puntos"
       }
      
       this.ataqueDelMonstruo()

       this.turnos.unshift({esJugador:true, text:mensaje})
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false
        },

        ataqueDelMonstruo: function () {
            var daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            
            this.saludJugador-= daño
            this.turnos.unshift({esJugador:false, text:"El monstruo te lastimó con " + daño + " puntos"})
            this.verificarGanador()
            
        },

        calcularHeridas: function (rango) {
            console.log(rango[0]+' '+rango[1])

            return Math.max(Math.floor(Math.random()*rango[1])+1,rango[0])
            

        },
        verificarGanador: function () {
           
            if(this.saludMonstruo<=0){
                if(confirm('Ganaste, jugar de nuevo?')){
                    this.empezarPartida()
                    

                }else{
                    
                        this.saludMonstruo=0
                    
                    this.terminarPartida()

                }
                return true
            }else if(this.saludJugador<=0){

                if(confirm('Perdiste, jugar de nuevo?')){
                    this.empezarPartida()
                    return true


                }else{
                    
                        this.saludJugador=0
                    

                    this.terminarPartida()
                }
                

            }
            return false
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});