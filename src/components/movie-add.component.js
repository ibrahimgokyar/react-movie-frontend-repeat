import React,{Component} from "react";
import FilmDataService from "../services/film.service";
export default class MovieAdd extends Component
{
    constructor(props)
    {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.filmKaydet = this.filmKaydet.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.state = {
            id : null,
            name : '',
            genre : '',
            image : '',
            releaseDate : '',
            duration :''
        }
    }

    componentDidMount()
    {
        console.log("film ekleme sayfası çağrıldı");
    }

    filmKaydet()
    {
        var kaydedilecekFilmData = {
            name : this.state.name,
            genre : this.state.genre,
            duration : "1",
            releaseDate: "01.01.2022",
            image : "https://www.opendart.com/movie1.jpg"
        }
       
        FilmDataService.movieSave(kaydedilecekFilmData)
        .then(kaydedilmisYeniFilm => {
            console.log(kaydedilmisYeniFilm.data);
            window.location.href= "/movies";
        }).catch(hata => {
            console.log(hata);
        })
    }
    onChangeName(e)
    {
        console.log(e.target.value);
        this.setState({
            name : e.target.value
        })
    }
    onChangeGenre(e)
    {
        this.setState({
            genre : e.target.value
        })
    }
    render()
    {
        return(
            <div>
                <div className="form-group">
                    <label htmlFor="name">Film Adı : </label>
                    <input
                    type="text"
                    className="form-control"
                    required
                    onChange={this.onChangeName}
                    value={this.state.name}
                    id="name" />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="genre">Konusu : </label>
                    <input
                    type="text"
                    className="form-control"
                    required
                    onChange={this.onChangeGenre}
                    value={this.state.genre}
                    id="genre" />
                </div>
                <br />
                <button className="btn btn-success" onClick={this.filmKaydet}>Kaydet </button>
            </div>
        )
    }
}