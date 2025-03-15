# How to install the project

Requirements:

- Node.js version 20 or higher
- Docker

---

Clone the repository:

```bash
git clone https://github.com/lucasKuratani/erco-energy-challenge.git
```

Start the database. It might take a while:

```bash
docker compose up
```

Install the dependencies and start the frontend:

```bash
cd frontend

npm install

npm run dev
```

Install the dependencies, seed the database and start the backend:  

```bash
cd backend

npm install

node ace migration:run

node ace serve --watch
```

# Analytics

The metrics I considered for this project are the following ones:

- Total number of tasks (simple metric, not much to it)
- Average completion time (so the user knows if it is taking them too long to complete the tasks)
- Percentage of each task status (so the user knows if too many tasks are stuck in each one of the statuses)
- Chart of how many tasks created per day (so the user knows one which days he created more tasks)

# Design

For the design, I tried following the design of Trello, where each task status has it's own column. There's not much to the analytics design, I just tried to make the infomation as easy as possible to read, with big letters and saturated colors.

# Authentication

The authentication is managed entirely by AdonisJS. According to [Adonis's documentation]('https://docs.adonisjs.com/guides/authentication/access-tokens-guard'), the tokens are not considered JWT, but rather opaque, since they do not follow the JWT standard, because Adonis implements its own token generation logic. Although its not considered JWT, the authentication flow would be the same if it was.

# Validation
There's validation on both the frontend and the backend. In the backend, Adonis uses a library called Vine. Next.js does not come with a built in validator, so I chose to use Zod.

# Conclusion
Initialy I created the frontend and the backend separately, and then had to delete the .git folder from each one, so both are included in one repository. That's wht there's not many commit messages. In the backend, I remove the .env file from the .gitignore file, just so it is easier for you to start it. I'd never do it in a real project.
