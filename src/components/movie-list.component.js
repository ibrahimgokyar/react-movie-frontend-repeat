import React,{Component} from "react";
import FilmDataService from "../services/film.service";
import {Link} from "react-router-dom";
export default class MovieList extends Component
{
    constructor(props)
    {
        super(props); // türetilmiş class ın constructor ına props parameterisi 
        //değişkenlerin array lerin nesnelerin durumlarının saklandığı bir alan 
        this.onChangeName = this.onChangeName.bind(this);
        this.Ara = this.Ara.bind(this);
        this.Yenile = this.Yenile.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
          films : [],
          searchName : ''
        }
    }

    //component yüklenirken ilk devreye giren fonksiyon

    componentDidMount(){
       console.log("movie list component çağrıldı");
       this.tumFilmleriGetir();
    }

    tumFilmleriGetir()
    {
        FilmDataService.getAllFilms()
        .then(filmListesiGeldi => {
          console.log(filmListesiGeldi.data);
          //state içindeki tanımladığımız array e verileri aktar
          this.setState({
            films : filmListesiGeldi.data
          })
        })
        .catch(hata => {
            console.log(hata);
        })
    }

    onChangeName(e) //olayın ne olduğunu bize söylecek
    {
         const  filmName =  e.target.value  //input içindeki değeri al filmName değişkenine ata
         this.setState({
          searchName : filmName            //filmName değişkenindeki değeri State içindeki searchName değişkenine ata
         })
    }

    Ara()
    {
       console.log(this.state.searchName);
       FilmDataService.FilmAdinaGoreAra(this.state.searchName)
       .then(aramaSonucuGelenVeri => {
          this.setState({
            films : aramaSonucuGelenVeri.data
          })
       })
       .catch(hata => {
         console.log(hata);
       })
    }

    Yenile()
    {
       this.tumFilmleriGetir();
    }

    handleKeyDown(e) {
      if(e.key ==='Enter'){
        console.log("Enter a basıldı")
        this.Ara();
      }
      else
      {
        console.log(e.key);
      }
    }

   // html deki body gibidir
    render()
    {
        //state içindeki films arrayindeki verileri burada kullanmak istiyorum
        const {films}  =  this.state;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                     <input
                     type="text"
                     onChange={this.onChangeName}
                     value={this.state.searchName}
                     onKeyDown={this.handleKeyDown}
                     on
                     placeholder="film adına göre ara"
                     className="form-control" />
                    
                    <div className="input-group-append">
                        <button className="btn btn-success" onClick={this.Ara}>Ara</button>
                        <button className="btn btn-danger" onClick={this.Yenile} >Sayfayı Yenile</button>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                <h4>Film Listesi</h4>
                <ul className="list-group" >
                  {films.map((film,index)=> (
                    <Link to={"/movies/"+film.id} className="btn btn-primary">
                    <li className="list-group-item" key={index}>
                      <div className="card">
                        <img src={film.image} alt={film.name} />
                        <div className="card-body">
                            <h5 className="card-title"><strong> Film Adı : </strong>{film.name}</h5>
                            <p className="card-text"><strong>Konusu : </strong>{film.genre}</p>
                            
                        </div>
                      </div>
                        </li>
                        </Link>
                  ))}
                </ul>
                </div>
            </div>
        )
    }
}