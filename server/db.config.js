module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1234",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};