var should = require("should");
var request = require("request");
var chai = require("chai");
const { compareSync } = require("bcrypt");
var expect = chai.expect;
var urlBase = "http://localhost:3000/api/";

describe("Teste de Api Andro Food", function () {
    it("GET /allfood LIST ALL FOOD", function (done) {
        request.get(
            {
                url: urlBase + "allfood"
            },
            function (error, response, body) {

                expect(response.statusCode).to.equal(200);


                done();
            }
        );
    });

    

    it("POST /loginClient LOGIN CLIENT", function (done) {

        const loginForm = {
            email: 'emanuel augusto', 
            passwordUser: '123456'
         };

        request.post(
            {
                url: urlBase + "loginClient",
                form: loginForm
            },
            function (error, response, body) {

                _body = JSON.parse(body);

                expect(_body.code).to.equal('200');


                done();
            }
        );
    });


    it("POST /food CREATE FOOD", function (done) {

        const createForm = {
            "idSalesman":"",
            "nome": "Steak au Poivre OU Bobó de Camarão OU Filé a Parmegiana R$ 27,90 Em estoque·Marca: Oficina Bar e EspetariaBífe",
            "imagem":"https://www.baratocoletivo.com.br/static/team/2015/0127/14223839587059.jpg",
            "loja":"Cantina de Paula",
            "preco":"15.75",
            "description":"teste",
            "status": "Brasileira"
            }

        request.post(
            {
                url: urlBase + "food",
                form: createForm,
                headers : {
                    "content-type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmFmZWZmZTc4ZDA2MTI5MzhhZjJjOTAiLCJ1c2VyIjp7ImVyYXNlZCI6MCwiX2lkIjoiNWZhZmVmZmU3OGQwNjEyOTM4YWYyYzkwIiwibmFtZVNhbGVzbWFuIjoiQ2FudGlhbiBkZSBQYXVsYSIsImltYWdlIjoiaHR0cHM6Ly9ldGFjYW5hZGF2aXNhLmNvbS5ici9tYWluL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE4LzA3L2ltYWdlMTEuanBnIiwiZW1haWwiOiJlbWFudWVsMDJhdWd1c3RvQGdtYWlsLmNvbSIsInR5cGVQcm9maWxlIjoic2FsZXNtYW4iLCJwYXNzd29yZCI6IiQyYiQxMCRoZjN1eHJJRzRrOG1sNzBWNWNRZzYub0xHWC9ISE55dFRwMVgwbFp1cDYwR2ZodE9PL3EwYSIsImNwZm9yQ25waiI6IjEzNDU1MzY5NDEzIiwiYWRkcmVzcyI6IkF2IHBhZHJlIG1vc2NhIGRlIGNhcnZhbGhvIDEwNCIsIl9fdiI6MH0sImlhdCI6MTYwNzU1NzU4NSwiZXhwIjoxNjA3NTY0Nzg1fQ.0R-ks5YaQA2-dSPkbnve2flhEQmdKhAH2kXVCl_8lV8"
                  }
            },
            function (error, response, body) {

                _body = JSON.parse(body);

                expect(response.statusCode).to.equal(200);


                done();
            }
        );
    });


});
