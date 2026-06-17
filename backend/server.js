import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'
import 'dotenv/config'



dotenv.config();

const prisma = new PrismaClient()
const app = express();

const cors = require("cors");
app.use(cors({
    origin: "https://tfilms-repo-backend.onrender.com"
}));
app.use(express.json());
const url = "https://tfilms-repo-backend.onrender.com"


// home 
app.get('/movies', async (req, res) => {
    try {

        const response = await axios.get(
            'https://api.themoviedb.org/3/movie/popular',
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'pt-BR'
                }
            }
        )


        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }))


        res.json(movies)

    } catch(error) {
        console.log(error)
        res.status(500).json({
            error:"Erro ao buscar filmes"
        })
    }
})

//movie-info

app.get('/movies/:id', async (req,res)=>{

    try{

        const {id} = req.params;


        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
                params:{
                    api_key: process.env.TMDB_API_KEY,
                    language:"pt-BR"
                }
            }
        );


        res.json(response.data);


    }catch(error){

        console.log(error.response?.data)

        res.status(500).json({
            error:"Erro ao buscar filme"
        })

    }

})

// favorites

app.post('/favorites', async (req,res)=>{

    const existingFavorite = await prisma.favorite.findFirst({
        where:{
            movieId: req.body.movieId
        }
    })


    if(existingFavorite){
        return res.status(400).json({
            error:"Filme já está nos favoritos"
        })
    }


    const favorite = await prisma.favorite.create({
        data:{
            movieId:req.body.movieId,
            title:req.body.title,
            poster:req.body.poster
        }
    })


    res.status(201).json(favorite)
})

app.get('/favorites', async (req, res) => {
    const movies = await prisma.favorite.findMany()
   
    res.status(200).json(movies)
});

app.delete('/favorites/:id', async (req, res) => {
    try {
        await prisma.favorite.delete({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({
            message: 'Favorito removido'
        })

    } catch (error) {
        console.error(error)

        res.status(500).json({
            error: "Erro ao remover favorito"
        })
    }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
