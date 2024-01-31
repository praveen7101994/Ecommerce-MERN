import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: "Use1r",
        email: 'user1@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false
    },
    {
        name: "User2",
        email: 'user2@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: "User3",
        email: 'user3@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: "Use4r",
        email: 'user4@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
]

export default users