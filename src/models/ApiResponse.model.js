class ApiResponse {
    status;
    msg;
    data;

    constructor(status, msg, data) {
        this.status = status; // sucesso, erro
        this.msg = msg; // mensagem de informação da resposta
        this.data = data; // dados associados à resposta
     }
}

module.exports = ApiResponse;
