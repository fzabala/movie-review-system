## SoutherCode challenge
A movie review system using Node.js and PostgresDB.

### What do you need?
- Docker
- Docker compose

### How to run it?
- Create your `.env` file based on `.env.example`. You'll need to register on https://themoviedb.org to get your credentials for `TMDB_API_KEY` and `TMDB_ACCESS_TOKEN`
- Do the same for `.env.test` based on `.env.test.example`.
- Install dependencies with `npm install`
- Build the container with `docker-compose up --build`

#### Running the migrations
- Go to the app container `docker exec -ti scc_app bash`
- Once there run the migrations with `npm run migrate`

### How to test it?
- `npm run test`

### Endpoints
#### [POST] /api/v1/reviews
Creates a review for a movie, specified by `tmdbId` parameter. If movie is not saved in database, it will be fetched from `https://api.themoviedb.org`

##### Body
```
{
    tmdbId: number,
    userName: string,
    rating: number
}
```
##### Returns
```
{
    data: ReviewModel
}
```

#### [GET] /api/v1/movies/:tmdbId/reviews
Fetch all reviews of a particular movie

##### Returns
```
{
    data: ReviewModel[]
}
```

#### [GET] /api/v1/users/:userName/reviews
Fetch all reviews submitted by a specific user.
##### Returns
```
{
    data: ReviewModel[]
}
```
