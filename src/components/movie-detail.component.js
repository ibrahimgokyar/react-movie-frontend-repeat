import React,{Component} from "react";
import FilmDataService from "../services/film.service";
export default class MovieDetail extends Component
{
      constructor(props)
      {
        super(props);
        this.getMovie = this.getMovie.bind(this);
        this.MovieDelete = this.MovieDelete.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.movieUpdate = this.movieUpdate.bind(this);
        this.state =  {
            // servisten gelen film için bir nesne 
              guncellenecekFilm : {
                id : null,
                name : '',
                genre : '',
                releaseDate : '',
                image :''
              }
        }
      }

    componentDidMount()
    {
        //servis katmanına 
        console.log("bir önceki sayfadan gelen film id : "+ this.props.match.params.id);
        this.getMovie(this.props.match.params.id);
    }

    getMovie(id)
    {
        FilmDataService.IdyeGoreFilmDetayGetir(id)
        .then(filmDetay => {
            console.log(filmDetay.data);
            this.setState({
                guncellenecekFilm : filmDetay.data
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    MovieDelete()
    {
        FilmDataService.FilmSil( this.props.match.params.id)
        .then(silinenFilm => {
            window.location.href = "/movies";
        })
        .catch(hata => {
            console.log(hata);
        })
    }
    onChangeName(e)
    {
        const detayName = e.target.value;
        this.setState(function (prevState){
            return {
                guncellenecekFilm : {
                    ...prevState.guncellenecekFilm,
                    name : detayName
                }
            }
        })
    }
    onChangeGenre(e)
    {
        const detayGenre = e.target.value;
        this.setState(function(prevState){
            return {
                guncellenecekFilm : {

                    ...prevState.guncellenecekFilm,
                    genre : detayGenre
                }
            }
        })
    }

    movieUpdate()
    {
        console.log(this.state.guncellenecekFilm.name);
        console.log(this.state.guncellenecekFilm.genre);
        console.log(this.state.guncellenecekFilm);
        FilmDataService.movieGuncelle(this.state.guncellenecekFilm.id,this.state.guncellenecekFilm)
        .then(guncellenmisFilm => {

           console.log(guncellenmisFilm.data);
           window.location.href="/movies";
        })
        .catch(hata => {
            console.log(hata);
        })
    }
    //html deki body
    render()
    {
       const  {guncellenecekFilm}  =  this.state;
        return(
            <div>
                <h4>Film Detay Sayfası</h4>
                <div className="form-group">
                    <label htmlFor="name">Film Adı : </label>
                    <input
                    type="text"
                    onChange={this.onChangeName}
                    value={guncellenecekFilm.name}
                    className="form-control"
                    id="name" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="genre">Konusu : </label>
                    <input
                    type="text"
                    value={guncellenecekFilm.genre}
                    onChange={this.onChangeGenre}
                    className="form-control"
                    id="genre" />
                </div>
                <br />
                <button className="btn btn-success" onClick={this.movieUpdate}>Güncelle</button>
                <button className="btn btn-danger" onClick={this.MovieDelete}>Sil</button>
            </div>
        )
    }
}